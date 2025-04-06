let words = [];

async function loadWords() {
  const res = await fetch('/api/words');
  words = await res.json();
  renderWords();
}

async function addWord() {
  const eng = document.getElementById('english-word').value.trim();
  const trans = document.getElementById('translation-word').value.trim();

  if (!eng || !trans) return;

  const newWord = { eng, trans };

  await fetch('/api/words', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newWord)
  });

  document.getElementById('english-word').value = '';
  document.getElementById('translation-word').value = '';

  loadWords();
}

function renderWords() {
  const list = document.getElementById('word-list');
  list.innerHTML = '';
  words.forEach((word, index) => {
    const div = document.createElement('div');
    div.className = 'word-card';

    div.innerHTML = `
      <span class="eng">${word.eng}</span>
      <span class="trans" id="trans-${index}" onclick="toggleTranslation(${index})">${word.trans}</span>
    `;

    list.appendChild(div);
  });
}


function toggleTranslation(index) {
  const el = document.getElementById(`trans-${index}`);
  el.classList.toggle('revealed');
}


loadWords();
