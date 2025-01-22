import { DEFAULT_CHECKBOXES } from './constants';
import { checkboxCountInput } from './dom-elements.js';

export function updateURL(selectedCategories) {
  const url = new URL(window.location);

  if (selectedCategories) {
    url.searchParams.set('categories', selectedCategories.join(','));
  }

  if (checkboxCountInput && checkboxCountInput.value) {
    url.searchParams.set('count', checkboxCountInput.value);
  } else {
    url.searchParams.set('count', selectedCategories.length || 0);
  }

  window.history.pushState({}, '', url);
}

export function updateSelectedDisplay(selectedCategories) {
  const selectedDisplayElement = document.getElementById('selected'); 
  if (selectedDisplayElement) {
    selectedDisplayElement.textContent = selectedCategories.join(', ');
  }
}

export function restoreFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const categories = urlParams.get('categories');
  const count = urlParams.get('count');

  return {
    categories: categories ? categories.split(',') : [],
    count: count ? parseInt(count, 10) : DEFAULT_CHECKBOXES,
  };
}
