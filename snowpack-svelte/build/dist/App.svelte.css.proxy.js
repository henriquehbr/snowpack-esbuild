// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body{margin:0;font-family:Arial, Helvetica, sans-serif}.App.svelte-rq4gzr.svelte-rq4gzr{text-align:center}.App.svelte-rq4gzr code.svelte-rq4gzr{background:#0002;padding:4px 8px;border-radius:4px}.App.svelte-rq4gzr p.svelte-rq4gzr{margin:0.4rem}.App-header.svelte-rq4gzr.svelte-rq4gzr{background-color:#f9f6f6;color:#333;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin)}.App-link.svelte-rq4gzr.svelte-rq4gzr{color:#ff3e00}.App-logo.svelte-rq4gzr.svelte-rq4gzr{height:36vmin;pointer-events:none;margin-bottom:3rem;animation:svelte-rq4gzr-App-logo-pulse infinite 1.6s ease-in-out alternate}@keyframes svelte-rq4gzr-App-logo-pulse{from{transform:scale(1)}to{transform:scale(1.06)}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}