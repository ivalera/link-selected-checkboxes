import { beforeEach, describe, expect, it } from 'vitest';
import { MAX_CHECKBOXES, MIN_CHECKBOXES } from '../src/js/constants';
import { onCheckboxCountChange } from '../src/js/ui';
import { updateSelectedDisplay } from '../src/js/utils';

describe('onCheckboxCountChange', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="checkbox-count-input" type="number" value="0" />
    `;
  });

  it('проверка на минимум для MIN_CHECKBOXES', () => {
    const checkboxCountInput = document.getElementById('checkbox-count-input');
    const event = { target: checkboxCountInput };
    checkboxCountInput.value = -5;
    onCheckboxCountChange(event);
    expect(checkboxCountInput.value).toBe(String(MIN_CHECKBOXES));
  });

  it('проверка на максимум для MAX_CHECKBOXES', () => {
    const checkboxCountInput = document.getElementById('checkbox-count-input');
    const event = { target: checkboxCountInput };
    checkboxCountInput.value = 150;
    onCheckboxCountChange(event);
    expect(checkboxCountInput.value).toBe(String(MAX_CHECKBOXES));
  });
});

describe('updateSelectedDisplay', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="selected"></div>`;
  });

  it('проверка на выбранные категории, их отображаемость', () => {
    const selectedCategories = ['1', '2', '3'];
    const selectedDisplayElement = document.getElementById('selected');
    expect(selectedDisplayElement).not.toBeNull();
    updateSelectedDisplay(selectedCategories);
    expect(selectedDisplayElement.textContent).toBe('1, 2, 3');
  });
});