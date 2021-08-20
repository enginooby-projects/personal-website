var critical = require('critical');

critical.generate({
  inline: true,
  src: 'page.html',
  target: {
    html: 'index.html',
    css: 'critical.css', // output inline critical css
  },
  // Critial auto detects all css files
  ignore: {
    atrule: ['@font-face'], // already preloaded
  },
});