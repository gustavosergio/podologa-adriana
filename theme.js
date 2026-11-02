// Aplicar antes da renderização para evitar flashes ao restaurar a preferência.
(() => {
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('adriana-theme'); } catch {}
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = savedTheme === 'dark' || savedTheme === 'light'
    ? savedTheme : (systemDark ? 'dark' : 'light');
})();
