/**
 * VouchSync Embeddable Widget (Vanilla JS)
 * Lightweight, zero dependencies, responsive.
 */

(function () {
  const SCRIPT_URL = document.currentScript.src;
  const HOST = new URL(SCRIPT_URL).origin;

  class VouchSyncWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
      const widgetId = this.getAttribute('data-widget-id');
      const theme = this.getAttribute('data-theme') || 'dark';

      if (!widgetId) {
        this.shadowRoot.innerHTML = `<p style="color:red;">VouchSync Error: Missing data-widget-id</p>`;
        return;
      }

      // Show loading state
      this.renderLoading(theme);

      try {
        // Fetch testimonial data
        // We pass the current window location to the API for strict CORS verification
        const response = await fetch(`${HOST}/api/widget/${widgetId}`, {
           headers: {
             'x-vouchsync-origin': window.location.origin
           }
        });

        if (!response.ok) {
          throw new Error('Failed to load testimonials or domain not authorized.');
        }

        const data = await response.json();
        this.renderWidget(data.testimonials, theme, data.isPro);

      } catch (error) {
        console.error('VouchSync Widget Error:', error);
        this.shadowRoot.innerHTML = ``; // Fail silently to not ruin the customer's website
      }
    }

    renderLoading(theme) {
      const bgColor = theme === 'dark' ? '#111' : '#f9f9f9';
      this.shadowRoot.innerHTML = `
        <div style="padding: 20px; background: ${bgColor}; border-radius: 12px; display: flex; gap: 10px; opacity: 0.5;">
           <div style="width: 40px; height: 40px; border-radius: 50%; background: #ccc; animation: pulse 1.5s infinite;"></div>
           <div style="flex:1;">
             <div style="height: 10px; background: #ccc; width: 60%; margin-bottom: 8px; border-radius: 4px;"></div>
             <div style="height: 10px; background: #ccc; width: 80%; border-radius: 4px;"></div>
           </div>
        </div>
        <style>@keyframes pulse { 0%, 100% {opacity: 1} 50% {opacity: 0.5} }</style>
      `;
    }

    renderWidget(testimonials, theme, isPro) {
      const isDark = theme === 'dark';
      const bgColor = isDark ? 'rgba(0,0,0,0.4)' : '#ffffff';
      const textColor = isDark ? '#fff' : '#111';
      const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

      let html = `
        <style>
          .v-container {
            font-family: system-ui, -apple-system, sans-serif;
            display: grid;
            gap: 16px;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            width: 100%;
          }
          .v-card {
            background: ${bgColor};
            border: 1px solid ${borderColor};
            border-radius: 12px;
            padding: 20px;
            color: ${textColor};
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            backdrop-filter: blur(10px);
          }
          .v-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
          }
          .v-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #5e6ad2, #a8b1ff);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }
          .v-content {
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 16px;
          }
          .v-metrics {
            background: rgba(94, 106, 210, 0.1);
            padding: 10px;
            border-radius: 8px;
            font-size: 13px;
            border: 1px solid rgba(94, 106, 210, 0.2);
          }
          .v-branding {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #888;
          }
          .v-branding a {
            color: #5e6ad2;
            text-decoration: none;
            font-weight: 500;
          }
          .v-branding a:hover {
            text-decoration: underline;
          }
        </style>
        <div class="v-container">
      `;

      testimonials.forEach(t => {
        let metricsHtml = '';
        if (t.metricsExtracted) {
          try {
            const metrics = JSON.parse(t.metricsExtracted);
            metricsHtml = `<div class="v-metrics"><strong>Impact:</strong> ${Object.entries(metrics).map(([k,v]) => `${k.replace(/([A-Z])/g, ' $1').trim()}: ${v}`).join(', ')}</div>`;
          } catch(e) {}
        }

        html += `
          <div class="v-card">
            <div class="v-header">
              <div class="v-avatar">${t.clientName.charAt(0)}</div>
              <div>
                <div style="font-weight:600">${t.clientName}</div>
                <div style="font-size:12px; opacity:0.7">${t.clientCompany}</div>
              </div>
            </div>
            <div class="v-content">${t.processedContent.replace(/\n/g, '<br/>')}</div>
            ${metricsHtml}
          </div>
        `;
      });

      html += `</div>`;

      // The critical PLG Viral Loop
      if (!isPro) {
        html += `
          <div class="v-branding">
            Powered by <a href="${HOST}?ref=widget" target="_blank">VouchSync</a>
          </div>
        `;
      }

      this.shadowRoot.innerHTML = html;
    }
  }

  customElements.define('vouchsync-widget', VouchSyncWidget);
})();
