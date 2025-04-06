let words = [];

async function startTest() {
    const count = parseInt(document.getElementById('test-count').value);
    const testArea = document.getElementById('test-section');
    const testWrapper = document.getElementById('test-scroll-wrapper');
    const startSection = document.getElementById('start-section');
    const checkAll = document.getElementById('check-all-container');
  
    testArea.innerHTML = '';
  
    try {
      const res = await fetch('/api/words');
      words = await res.json();
    } catch (err) {
      alert('Failed to load words');
      return;
    }
  
    if (!count || count < 1 || words.length < count) {
      alert('Please enter a valid number and ensure you have enough words.');
      return;
    }
  
    startSection.style.display = 'none';
    testWrapper.style.display = 'block';
    checkAll.style.display = 'block';
  
    const shuffled = [...words].sort(() => 0.5 - Math.random()).slice(0, count);
  
    shuffled.forEach((word, i) => {
      const card = document.createElement('div');
      card.className = 'card p-3 mb-3 card-word';
      card.innerHTML = `
        <p><strong>${word.eng}</strong></p>
        <div class="input-group">
          <input type="text" class="form-control" id="answer-${i}" placeholder="Enter translation" autocomplete="off" data-correct="${word.trans}" />
        </div>
      `;
  
      testArea.appendChild(card);
  
      // Плавное появление с задержкой
      setTimeout(() => {
        card.classList.add('visible');
      }, i * 100); // задержка между карточками
    });
  }
  

  function checkAllAnswers() {
    const inputs = document.querySelectorAll('input[id^="answer-"]');
    inputs.forEach((input) => {
      const correct = input.dataset.correct.toLowerCase().trim();
      const userAnswer = input.value.toLowerCase().trim();
  
      input.classList.remove('is-valid', 'is-invalid');
      if (userAnswer === correct) {
        input.classList.add('is-valid');
      } else {
        input.classList.add('is-invalid');
      }
    });
  }
  
