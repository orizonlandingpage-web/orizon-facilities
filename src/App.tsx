import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { CookieConsentBanner } from './components/CookieConsent';
import { CtaFaixa } from './components/CtaFaixa';
import { Hero } from './sections/Hero';
import { BarraConfianca } from './sections/BarraConfianca';
import { Problema } from './sections/Problema';
import { Servicos } from './sections/Servicos';
import { Diferenciais } from './sections/Diferenciais';
import { Processo } from './sections/Processo';
import { SolucoesSobMedida } from './sections/SolucoesSobMedida';
import { Conformidade } from './sections/Conformidade';
import { FAQ } from './sections/FAQ';
import { CTAFinal } from './sections/CTAFinal';

/**
 * Ordem das seções validada pela pesquisa de CRO/copywriting (ver plano):
 * hero → confiança → problema → serviços → diferenciais → CTA intermediário
 * → processo → soluções sob medida → conformidade → FAQ → CTA final.
 */
function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BarraConfianca />
        <Problema />
        <Servicos />
        <Diferenciais />
        <CtaFaixa titulo="Pronto para parar de administrar pessoas e passar a administrar um contrato?" />
        <Processo />
        <SolucoesSobMedida />
        <Conformidade />
        <FAQ />
        <CTAFinal />
        {/* Dentro de <main>, não solto no body: axe-core acusa "region"
            (conteúdo fora de landmark) quando um elemento fixed fica como
            irmão direto de <main>/<footer>. O FAB é uma ação da página,
            então pertence semanticamente ao conteúdo principal. */}
        <WhatsAppFab />
        <CookieConsentBanner />
      </main>
      <Footer />
    </>
  );
}

export default App;
