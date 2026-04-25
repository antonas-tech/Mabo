import LenisProvider from "@/hooks/useLenis";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import CapabilitiesTabs from "@/components/CapabilitiesTabs";
import GalleryProcess from "@/components/GalleryProcess";
import ContactInteraction from "@/components/ContactInteraction";

export default function Home() {
  return (
    <LenisProvider>
      <main className="relative min-h-screen overflow-hidden bg-mm-black text-mm-porcelain">
        <Hero />
        <Philosophy />
        <CapabilitiesTabs />
        <GalleryProcess />
        <ContactInteraction />
      </main>
    </LenisProvider>
  );
}
