import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';

/** Marketing layout: full header, footer and the mobile sticky CTA. */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
