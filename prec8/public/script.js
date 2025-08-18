const countEl = document.getElementById('count');
const incBtn = document.getElementById('increment');
const decBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

async function fetchCount() {
  const res = await fetch('/api/count');
  const data = await res.json();
  countEl.textContent = data.count;
}

async function post(path) {
  const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
  const data = await res.json();
  countEl.textContent = data.count;
  haptic();
}

incBtn.addEventListener('click', () => post('/api/increment'));
decBtn.addEventListener('click', () => post('/api/decrement'));
resetBtn.addEventListener('click', () => post('/api/reset'));

fetchCount();
