// Función para cargar recursos en el orden correcto
function loadResources() {
  const head = document.head;
  const body = document.body;

  // 1. Cargar CSS primero
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'styles/flashcards.css';
  head.appendChild(link);

  // 2. Cargar latex-support.js primero
  const latexScript = document.createElement('script');
  latexScript.src = 'scripts/latex-support.js';
  
  latexScript.onload = function() {
    // 3. Ahora cargar MathJax después de latex-support
    const mathjax = document.createElement('script');
    mathjax.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    mathjax.async = true;
    mathjax.id = 'MathJax-script';
    head.appendChild(mathjax);

    mathjax.onload = function() {
      // 4. Cargar los demás scripts después de MathJax
      const cardScript = document.createElement('script');
      cardScript.src = 'scripts/card-info-controller.js';
      body.appendChild(cardScript);
      
      cardScript.onload = function() {
        const styleScript = document.createElement('script');
        styleScript.src = 'scripts/style-switcher.js';
        body.appendChild(styleScript);
      };
    };

    mathjax.onerror = function() {
      console.error('Error al cargar MathJax');
      loadRemainingScripts();
    };
  };

  latexScript.onerror = function() {
    console.error('Error al cargar latex-support.js');
    loadRemainingScripts();
  };

  // Insertar latex-support en el head
  head.appendChild(latexScript);
}

// Función para cargar los scripts restantes si hay errores
function loadRemainingScripts() {
  const body = document.body;
  const scripts = [
    'scripts/card-info-controller.js',
    'scripts/style-switcher.js'
  ];
  
  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    body.appendChild(script);
  });
}

// Iniciar la carga cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadResources);
} else {
  loadResources();
}