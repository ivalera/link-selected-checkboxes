import { MAX_CHECKBOXES, MIN_CHECKBOXES } from './constants';
import { checkboxCountInput, checkboxTemplate, checkboxesContainer } from './dom-elements.js';
import { restoreFromURL, updateSelectedDisplay, updateURL } from './utils.js';

let selectedCategoriesID = [];

export function onCheckboxCountChange(event) {
  let value = event.target.value;

  if (value < MIN_CHECKBOXES) {
    event.target.value = MIN_CHECKBOXES;
  } else if (value > MAX_CHECKBOXES) {
    event.target.value = MAX_CHECKBOXES;
  }

  updateURL(selectedCategoriesID);
}

export function handleCategoryFormSubmit(event) {
  event.preventDefault();

  const count = checkboxCountInput.value;
  generateCheckboxes(count);
}

function handleCheckboxChange(event) {
  const value = event.target.value;

  if (event.target.checked) {
    if (!selectedCategoriesID.includes(value)) {
      selectedCategoriesID.push(value);
    }
  } else {
    selectedCategoriesID = selectedCategoriesID.filter(id => id !== value);
  }

  updateURL(selectedCategoriesID);
  updateSelectedDisplay(selectedCategoriesID);
}

function generateCheckboxes(count, resetSelection = true) {
  const template = checkboxTemplate;
  checkboxesContainer.innerHTML = '';

  if (resetSelection) {
    selectedCategoriesID = [];
  }

  updateURL(selectedCategoriesID);
  updateSelectedDisplay(selectedCategoriesID);

  for (let i = 1; i <= count; i++) {
    const checkboxItem = template.content.cloneNode(true);
    const checkbox = checkboxItem.querySelector('input');
    const label = checkboxItem.querySelector('label');

    checkbox.type = 'checkbox';
    checkbox.id = `cat${i}`;
    checkbox.value = i;
    label.htmlFor = `cat${i}`;
    label.textContent = `Категория ${i}`;

    checkbox.checked = selectedCategoriesID.includes(checkbox.value);

    checkbox.addEventListener('change', handleCheckboxChange);

    checkboxesContainer.appendChild(checkboxItem);
  }
}

export function restoreInitialize() {
  const { categories, count } = restoreFromURL();

  checkboxCountInput.value = count;

  if (categories.length) {
    selectedCategoriesID = categories;
  }

  generateCheckboxes(count, false);

  if (categories.length) {
    updateSelectedDisplay(selectedCategoriesID);
  }
}