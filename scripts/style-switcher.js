const root = document.documentElement;
const path = window.location.pathname.replace(/\.html$/, '');

// Configuración de colores por ruta (fácilmente escalable)
const routeColors = {
  '/algebra': {
    primary: '#ff5c5c'
  },
  '/trigonometricas': {
    primary: '#8f69cc'
  },
  '/integrales': {
    primary: '#af4c81ff'
  },
  '/derivadas': {
    primary: '#83BCFF'
  },
  '/algebrau3': {
    primary: '#2196f3'
  },
  '/default': {
    primary: '#ffffff'
  }
  //Correcciones de error
};

// Obtener la configuración de colores para la ruta actual o usar los valores por defecto
const colorConfig = routeColors[path] || routeColors['/default'];

// Aplicar los colores
root.style.setProperty('--primary-color', colorConfig.primary);
root.style.setProperty('--secondary-color', colorConfig.primary);