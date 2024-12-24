const TICK_MARK = "&#10004;";
const CROSS_MARK = "&#x2718;";
const BASE_URL = '/api/v1/prayers';

const tbody = document.getElementById('prayer-table').getElementsByTagName('tbody')[0];
const countText = document.querySelector('.count');
const showIncompleteBtn = document.getElementById('show-incomplete-btn');

showIncompleteBtn.addEventListener('click', toggleShowIncompleteAction);

async function toggleShowIncompleteAction() {
  const buttonAction = showIncompleteBtn.textContent;
  if (buttonAction === 'Show incomplete') {
    updatePrayerTable('isDone=false');
    showIncompleteBtn.textContent = 'Show all';
  } else {
    updatePrayerTable();
    showIncompleteBtn.textContent = 'Show incomplete';
  }
}

async function updatePrayerTable(filterQuery) {
  tbody.innerHTML = '';
  let URL = BASE_URL;
  if (filterQuery) {
    URL = `${BASE_URL}?${filterQuery}`;
  }
  const res = await fetch(URL);
  const data = await res.json();
  for (let obj of data) {
    tbody.insertRow().innerHTML = `
        <tr>
          <td>${obj.prayerDate.substring(0, 10)}</td>
          <td>${obj.fajar === true ? TICK_MARK : CROSS_MARK}</td>
          <td>${obj.zuhar === true ? TICK_MARK : CROSS_MARK}</td>
          <td>${obj.asar === true ? TICK_MARK : CROSS_MARK}</td>
          <td>${obj.magrib === true ? TICK_MARK : CROSS_MARK}</td>
          <td>${obj.isha === true ? TICK_MARK : CROSS_MARK}</td>
        </tr>
    `;
  }
  countText.innerHTML = `Count: ${data?.length}`;
}

function init() {
  updatePrayerTable();
}

init();
