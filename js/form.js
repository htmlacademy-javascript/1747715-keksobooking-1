import { sliderElement } from './slider.js';

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

// Функция, которая перводит поля ввода, кнопки и текстовые поля форм в НЕактивное состояние

const setDisabledFormElements = (form) => {
  const inputs = form.querySelectorAll('input');
  const selects = form.querySelectorAll('select');
  const textareas = form.querySelectorAll('textarea');
  const buttons = form.querySelectorAll('button');

  [...inputs, ...selects, ...textareas, ...buttons].forEach((element) => {
    element.disabled = true;
  });
  sliderElement.setAttribute('disabled', true);
};

// Функция, которая перводит поля ввода, кнопки и текстовые поля форм в активное состояние

const setEnabledFormElements = (form) => {
  const inputs = form.querySelectorAll('input');
  const selects = form.querySelectorAll('select');
  const textareas = form.querySelectorAll('textarea');
  const buttons = form.querySelectorAll('button');

  [...inputs, ...selects, ...textareas, ...buttons].forEach((element) => {
    element.disabled = false;
  });
  sliderElement.removeAttribute('disabled', true);
};

// Перевод формы в НЕактивную форму + дезактивация полей

const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');

  setDisabledFormElements(adForm);
  setDisabledFormElements(mapForm);
};

// Перевод формы в активную форму + активация полей

const enableForms = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');

  setEnabledFormElements(adForm);
  setEnabledFormElements(mapForm);
};

export { disableForms, enableForms };


