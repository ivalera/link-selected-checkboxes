import { DEFAULT_CHECKBOXES } from './constants';
import { checkboxCountInput, selectedDisplay } from './dom-elements.js';

export function updateURL(selectedCategories) {
  const url = new URL(window.location);
  url.searchParams.set('categories', selectedCategories.join(','));
  const count = checkboxCountInput.value;
  url.searchParams.set('count', count || selectedCategories.length);
  window.history.pushState({}, '', url);
}
  
export function updateSelectedDisplay(selectedCategories) {
  selectedDisplay.textContent = selectedCategories.join(', ');
}
  
export function restoreFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const categories = urlParams.get('categories');
  const count = urlParams.get('count');

  return {
    categories: categories ? categories.split(',') : [],
    count: count ? parseInt(count, 10) : DEFAULT_CHECKBOXES
  };
}