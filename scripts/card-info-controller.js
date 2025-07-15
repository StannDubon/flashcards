class FlashcardController {
  constructor() {
    this.flashcards = [];
  }

  getJsonFilenameFromUrl() {
    const path = window.location.pathname;
    const pathSegments = path.split('/').filter(segment => segment !== '');
    
    let lastSegment = 'default';
    
    if (pathSegments.length > 0) {
      lastSegment = pathSegments[pathSegments.length - 1];
      
      if (pathSegments.length > 1 && 
          (lastSegment === 'index.html' || lastSegment === 'index.htm')) {
        lastSegment = pathSegments[pathSegments.length - 2];
      }
      else if (lastSegment.endsWith('.html') || lastSegment.endsWith('.htm')) {
        lastSegment = lastSegment.replace(/\.html?$/, '');
      }
    }
    
    return `${lastSegment}.json`;
  }

  async loadFlashcards() {
    try {
      const jsonFile = this.getJsonFilenameFromUrl();
      const response = await fetch(`/jsons/${jsonFile}`);
      
      if (!response.ok) {
        const defaultResponse = await fetch('/jsons/default.json');
        if (!defaultResponse.ok) throw new Error('No se pudo cargar ningún archivo JSON');
        const defaultData = await defaultResponse.json();
        this.flashcards = defaultData.flashcards || [];
        console.warn(`No se encontró ${jsonFile}, cargando default.json`);
        return;
      }
      
      const data = await response.json();
      this.flashcards = data.flashcards || [];
      console.log(`Flashcards cargadas desde ${jsonFile}`);
    } catch (error) {
      console.error('Error al cargar las flashcards:', error);
      this.flashcards = [];
    }
  }

  getAllFlashcards() {
    return this.flashcards;
  }

  getFlashcardByIndex(index) {
    return this.flashcards[index] || null;
  }

  addFlashcard(question, answer) {
    this.flashcards.push({ q: question, a: answer });
  }
}

// Variables de estado
let currentIndex = -1;
let showingAnswer = false;
let usedIndices = [];
const flashcardController = new FlashcardController();

// Funciones de manejo de flashcards
function updateCounter() {
  const flashcards = flashcardController.getAllFlashcards();
  document.getElementById('counter').textContent = `${usedIndices.length}/${flashcards.length}`;
}

function flipCard() {
  const card = document.getElementById('card-inner');
  card.classList.toggle('flip-in', !showingAnswer);
  card.classList.toggle('flip-out', showingAnswer);
  showingAnswer = !showingAnswer;
}

async function nextCard() {
  const card = document.getElementById('card-inner');
  const flashcards = flashcardController.getAllFlashcards();
  
  if (flashcards.length === 0) {
    console.error('No hay flashcards disponibles');
    return;
  }
  
  if (usedIndices.length === flashcards.length) {
    usedIndices = [];
  }
  
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * flashcards.length);
  } while (usedIndices.includes(newIndex) && usedIndices.length < flashcards.length);
  
  usedIndices.push(newIndex);
  currentIndex = newIndex;
  
  if (showingAnswer) {
    card.classList.remove('flip-in');
    card.classList.add('flip-out');
    showingAnswer = false;
  }
  
  setTimeout(() => {
    const fc = flashcards[currentIndex];
    document.getElementById('question').querySelector('.card-content').innerHTML = fc.q;
    document.getElementById('answer').querySelector('.card-content').innerHTML = fc.a;
    
    if (window.MathJax?.typesetPromise) {
      MathJax.typesetPromise();
    }
    
    updateCounter();
  }, 300);
}

// Event listeners
if (window.innerWidth > 768) {
  document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
      e.preventDefault();
      showingAnswer ? nextCard() : flipCard();
    }
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextCard();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') flipCard();
  });
}

// Inicialización
window.onload = async function() {
  await flashcardController.loadFlashcards();
  
  if (flashcardController.getAllFlashcards().length > 0) {
    nextCard();
    updateCounter();
  } else {
    document.getElementById('question').querySelector('.card-content').innerHTML = 
      'No se encontraron flashcards. Intenta recargar la página.';
  }
  
  if (window.MathJax) {
    MathJax.startup.document.state(0);
    MathJax.typesetPromise();
  }
}; 