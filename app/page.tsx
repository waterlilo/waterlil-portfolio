import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Page() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <Header />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
