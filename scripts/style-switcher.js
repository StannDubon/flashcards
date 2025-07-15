const path = window.location.pathname;
const root = document.documentElement;

// Normaliza la ruta para quitar ".html" si lo trae
const cleanPath = path.replace(/\.html$/, '');

if (cleanPath === "/algebra") {
  root.style.setProperty('--primary-color', '#ff5c5c');
  root.style.setProperty('--secondary-color', '#ff9999');
} else if (cleanPath === "/trigonometricas") {
  root.style.setProperty('--primary-color', '#8f69cc');
  root.style.setProperty('--secondary-color', '#8f69cc');
} else if (cleanPath === "/integrales") {
  root.style.setProperty('--primary-color', '#4caf50');
  root.style.setProperty('--secondary-color', '#81c784');
} else {
  // Valores por defecto (ej. blanco)
  root.style.setProperty('--primary-color', '#ffffff');
  root.style.setProperty('--secondary-color', '#ffffff');
}
