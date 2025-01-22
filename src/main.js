let selectedCategories = [];

document.getElementById('checkbox-count').addEventListener('input', (event) => {
  let value = event.target.value;

  if (value < 0) {
    event.target.value = 0;
  } else if (value > 100) {
    event.target.value = 100;
  }

  updateURL();
});

function updateURL() {
  const url = new URL(window.location);
  url.searchParams.set('categories', selectedCategories.join(','));
  const count = document.getElementById('checkbox-count').value;
  url.searchParams.set('count', count || selectedCategories.length);
  window.history.pushState({}, '', url);
}

function updateSelectedDisplay() {
  document.getElementById('selected').textContent = selectedCategories.join(', ');
}


function generateCheckboxes(count, resetSelection = true) {
  const checkboxesContainer = document.getElementById('checkboxes');
  checkboxesContainer.innerHTML = '';

  if (resetSelection) {
    selectedCategories = [];
  }

  updateURL();
  updateSelectedDisplay();

  for (let i = 1; i <= count; i++) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `cat${i}`;
    checkbox.value = i;
    checkbox.addEventListener('change', (event) => {
      const value = event.target.value;

      if (event.target.checked) {
        selectedCategories.push(value);
      } else {
        selectedCategories = selectedCategories.filter(id => id !== value);
      }

      updateURL();
      updateSelectedDisplay();
    });

    const label = document.createElement('label');
    label.htmlFor = `cat${i}`;
    label.textContent = ` Категория ${i}`;

    const lineBreak = document.createElement('br');

    checkboxesContainer.appendChild(checkbox);
    checkboxesContainer.appendChild(label);
    checkboxesContainer.appendChild(lineBreak);
  }
}

function restoreFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const categories = urlParams.get('categories');
  const count = urlParams.get('count');

  const checkboxCount = count ? parseInt(count, 10) : 5;
  document.getElementById('checkbox-count').value = checkboxCount;

  if (categories) {
    selectedCategories = categories.split(',');
  }

  generateCheckboxes(checkboxCount, false);

  if (categories) {
    selectedCategories.forEach(id => {
      const checkbox = document.querySelector(`input[value="${id}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
    updateSelectedDisplay();
  }
}

document.getElementById('category-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const count = document.getElementById('checkbox-count').value;
  generateCheckboxes(count);
});

restoreFromURL();