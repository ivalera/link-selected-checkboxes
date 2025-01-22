import { MAX_CHECKBOCES, MIN_CHECKBOCES } from './constants';
import { checkboxCountInput, checkboxesContainer } from './dom-elements.js';
import { restoreFromURL, updateSelectedDisplay, updateURL } from './utils.js';

let selectedCategoriesID = [];

export function onCheckboxCountChange(event) {
  let value = event.target.value;

  if (value < MIN_CHECKBOCES) {
    event.target.value = MIN_CHECKBOCES;
  } else if (value > MAX_CHECKBOCES) {
    event.target.value = MAX_CHECKBOCES;
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
  const checkboxesBlock = checkboxesContainer;
  checkboxesBlock.innerHTML = '';

  if (resetSelection) {
    selectedCategoriesID = [];
  }

  updateURL(selectedCategoriesID);
  updateSelectedDisplay(selectedCategoriesID);

  for (let i = 1; i <= count; i++) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `cat${i}`;
    checkbox.value = i;

    checkbox.checked = selectedCategoriesID.includes(checkbox.value);

    checkbox.addEventListener('change', handleCheckboxChange);

    const label = document.createElement('label');
    label.htmlFor = `cat${i}`;
    label.textContent = `Категория ${i}`;

    const lineBreak = document.createElement('br');

    checkboxesBlock.appendChild(checkbox);
    checkboxesBlock.appendChild(label);
    checkboxesBlock.appendChild(lineBreak);
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