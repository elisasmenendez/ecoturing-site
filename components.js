/**
 * EcoTuring — Web Components
 * <eco-header pagina-ativa="vr" base="../"></eco-header>
 * <eco-footer base="../"></eco-footer>
 *
 * Atributos:
 *   base          — caminho relativo até a raiz do site
 *                   raiz:      base="./"
 *                   subpasta:  base="../"
 *   pagina-ativa  — id da página atual para destacar no nav
 *                   valores: inicio | publicacoes | vr | download | privacidade
 */


// ─── Itens de navegação ────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home',       label: 'Início',       path: ''             },
  { id: 'publications',  label: 'Publicações',  path: 'publications/' },
  { id: 'virtual-reality',           label: 'VR 360°',      path: 'virtual-reality/'          },
  { id: 'download',     label: 'Download',     path: 'download/'    },
  { id: 'privacy-policy',  label: 'Política de Privacidade',  path: 'privacy-policy/' },
];

// ══════════════════════════════════════════════════════════════════════════════
// <eco-header>
// ══════════════════════════════════════════════════════════════════════════════
class EcoHeader extends HTMLElement {
  connectedCallback() {
    const base  = this.getAttribute('base') || './';
    const ativo = this.getAttribute('pagina-ativa') || '';

    const navLinks = NAV_ITEMS.map(({ id, label, path }) => {
      const href      = base + path;
      const className = id === ativo ? ' class="ativo"' : '';
      return `<a href="${href}"${className}>${label}</a>`;
    }).join('\n        ');

    this.innerHTML = `
      <header class="site-header">
        <div class="header-inner">

          <a href="${base}" class="site-logo">
            <img src="${base}logo-horizontal.jpeg" alt="EcoTuring" class="logo-img">
          </a>

          <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect y="4"  width="22" height="2" rx="1" fill="currentColor"/>
              <rect y="10" width="22" height="2" rx="1" fill="currentColor"/>
              <rect y="16" width="22" height="2" rx="1" fill="currentColor"/>
            </svg>
          </button>

          <nav class="site-nav">
            ${navLinks}
          </nav>

        </div>
      </header>
    `;

    // Menu mobile
    const btn = this.querySelector('.menu-toggle');
    const nav = this.querySelector('.site-nav');
    btn.addEventListener('click', () => {
      const aberto = nav.classList.toggle('aberto');
      btn.setAttribute('aria-expanded', aberto);
    });

    // Fecha o menu ao clicar num link
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('aberto');
        btn.setAttribute('aria-expanded', false);
      });
    });
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// <eco-footer>
// ══════════════════════════════════════════════════════════════════════════════
class EcoFooter extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('base') || './';

    const footerLinks = NAV_ITEMS.map(({ id, label, path }) => {
      const href  = base + path;
      const texto = id === 'privacy-policy' ? 'Política de Privacidade' : label;
      return `<a href="${href}">${texto}</a>`;
    }).join('\n        ');

    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-logo">
            <img src="${base}logo-horizontal.jpeg" alt="EcoTuring" class="footer-logo-img">
          </div>
          <div class="footer-links">
            ${footerLinks}
          </div>
          <div>IF Baiano · Campus Xique-Xique · Campus Valença</div>
        </div>
      </footer>
    `;
  }
}

// ─── Registro ─────────────────────────────────────────────────────────────
customElements.define('eco-header', EcoHeader);
customElements.define('eco-footer', EcoFooter);
