import { categoryForm, checkboxCountInput } from './dom-elements.js';
import { handleCategoryFormSubmit, onCheckboxCountChange, restoreInitialize } from './ui.js';

checkboxCountInput.addEventListener('input', onCheckboxCountChange);
categoryForm.addEventListener('submit', handleCategoryFormSubmit);

restoreInitialize();