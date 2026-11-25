const demo = document.querySelector('.demo');

if (demo) {
  const tabs = [...demo.querySelectorAll('[data-demo]')];
  const buttons = demo.querySelector('.demo-buttons');
  buttons.setAttribute('role', 'tablist');

  function select(index, focus = false) {
    tabs.forEach((tab, position) => {
      const selected = position === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.dataset.demo).hidden = !selected;
      if (selected && focus) tab.focus();
    });
  }

  tabs.forEach((tab, index) => {
    const panel = document.getElementById(tab.dataset.demo);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const next = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next, true);
    });
  });
  select(0);
  demo.dataset.enhanced = '';
}
