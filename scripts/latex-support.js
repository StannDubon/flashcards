window.MathJax = {
      tex: { 
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        tags: 'ams',
        packages: {'[+]': ['color']}
      },
      svg: { fontCache: 'global' },
      options: {
        enableMenu: false
      },
      loader: {load: ['[tex]/color']}
    };