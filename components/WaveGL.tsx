"use client";

import { useEffect, useRef } from "react";

const vert = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = (aPos + 1.0) * 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const frag = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;

/* hash / noise */
float hash(vec2 p){
  p = fract(p*vec2(123.34, 456.21));
  p += dot(p, p+45.32);
  return fract(p.x*p.y);
}
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v = 0.0;
  float a = 0.55;
  for(int i=0;i<5;i++){
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

float sCurve(float x, float t){
  // the “signature” S-curve from the reference
  return 0.16*sin(x*1.25 - t*1.3) + 0.07*sin(x*2.4 + t*0.9);
}

void main() {
  vec2 uv = vUv;

  // aspect-correct space
  vec2 p = uv - 0.5;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.12; // slow like the reference

  // flow field (makes smoke “slide” along the ribbon)
  vec2 flow;
  flow.x = fbm(p*1.15 + vec2(0.0, t*0.9));
  flow.y = fbm(p*1.15 + vec2(3.2, -t*0.8));
  vec2 r = p + (flow - 0.5) * 0.28;

  // ribbon centerline
  float centerY = sCurve(r.x, t);
  float dist = abs(r.y - centerY);

  // thin band (key difference vs your wide strip)
  float band = smoothstep(0.22, 0.02, dist);

  // internal smoke shaping (prevents flat strip)
  float smoke = fbm(r*2.1 + vec2(t*1.4, -t*1.1));
  smoke = smoothstep(0.25, 0.95, smoke);
  band *= smoke;

  // “crest” highlight: very thin, brighter edge
  float crest = smoothstep(0.06, 0.0, dist) * band;

  // fade to edges (keeps it floating in darkness)
  float vign = smoothstep(1.10, 0.25, length(p));
  band *= vign;
  crest *= vign;

  // DARK navy / steel-blue (closer to samthecreatory2k.com)
  vec3 bodyCol = vec3(0.08, 0.14, 0.23);   // very dark blue
  vec3 crestCol = vec3(0.42, 0.55, 0.72);   // muted highlight, not cyan

  // softer energy — glow only on the crest
  float bodyA  = band *0.36;
  float crestA = crest * 0.55;


  vec3 col = bodyCol * bodyA + crestCol * crestA;

  // final alpha (soft)
  float alpha = clamp(bodyA + crestA, 0.0, 0.75);

  gl_FragColor = vec4(col, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(sh) || "shader error");
  }
  return sh;
}

function link(gl: WebGLRenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p) || "program error");
  }
  return p;
}

export function WaveGL({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    const program = link(gl, vert, frag);
    gl.useProgram(program);

    const posLoc = gl.getAttribLocation(program, "aPos");
    const resLoc = gl.getUniformLocation(program, "uRes");
    const timeLoc = gl.getUniformLocation(program, "uTime");

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const start = performance.now();

    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLoc, t);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {/* base wave */}
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />

      {/* soft bloom like in the reference */}
      <div className="absolute inset-0 blur-[22px] opacity-70" style={{ background: "transparent" }} />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.28) 62%, rgba(0,0,0,0.80) 100%)"
        }}
      />
    </div>
  );
}
