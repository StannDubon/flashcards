    // [Mantén el resto del JavaScript igual que en tu versión original]
    let currentIndex = -1;
    let showingAnswer = false;
    let usedIndices = [];

    function updateCounter() {
      document.getElementById('counter').textContent = `${usedIndices.length}/${flashcards.length}`;
    }

    function flipCard() {
      const card = document.getElementById('card-inner');
      if (showingAnswer) {
        card.classList.remove('flip-in');
        card.classList.add('flip-out');
      } else {
        card.classList.remove('flip-out');
        card.classList.add('flip-in');
      }
      showingAnswer = !showingAnswer;
    }

    function nextCard() {
      const card = document.getElementById('card-inner');
      
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
        
        if (window.MathJax && MathJax.typesetPromise) {
          MathJax.typesetPromise();
        }
        
        updateCounter();
      }, 300);
    }

    if (window.innerWidth > 768) {
      document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
          e.preventDefault();
          if (!showingAnswer) {
            flipCard();
          } else {
            nextCard();
          }
        }
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          nextCard();
        }
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          flipCard();
        }
      });
    }

    window.onload = function() {
      nextCard();
      updateCounter();
      
      if (window.MathJax) {
        MathJax.startup.document.state(0);
        MathJax.typesetPromise();
      }
    };