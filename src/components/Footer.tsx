import { site } from '../config/site';

/**
 * pb-24 compensa a altura do WhatsAppFab (56px + margens) para que ele nunca
 * cubra o último elemento focável da página — WCAG 2.4.11 (Focus Not
 * Obscured, AA).
 */
export function Footer() {
  return (
    <footer className="bg-navy px-6 pt-16 pb-24 text-graymid">
      <div className="mx-auto max-w-6xl">
        <img src="/images/logo-white.webp" alt="Orizon Facilities" className="h-14 w-auto" />
        <p className="mt-4 max-w-md text-sm">
          Terceirização de serviços condominiais: limpeza, manutenção predial, jardinagem e
          controle de acesso.
        </p>

        <div className="mt-8 grid gap-2 text-sm sm:grid-cols-2">
          <p>Atendemos condomínios em {site.cidade}.</p>
          <p>CNPJ {site.cnpj}</p>
          <p>
            <a href={`tel:${site.telefone.replace(/\D/g, '')}`} className="hover:text-offwhite">
              {site.telefone}
            </a>
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-offwhite">
              {site.email}
            </a>
          </p>
        </div>

        {/* text-graymid puro (não /70): a versão com opacidade reduzida
            reprovava contraste AA sobre navy (3,23:1, medido com axe-core). */}
        <div className="mt-10 border-t border-graymid/20 pt-6 text-xs text-graymid">
          <p>&copy; {new Date().getFullYear()} Orizon Facilities. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
