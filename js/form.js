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
    element.setAttribute('disabled', true);
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
    element.removeAttribute('disabled');
  });
  sliderElement.removeAttribute('disabled');
};

// Перевод фильтров в НЕактивное состояние

const disableFilter = () => {
  mapForm.classList.add('map__filters--disabled');
  setDisabledFormElements(mapForm);
};

// Перевод формы в НЕактивную форму + дезактивация полей

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  setDisabledFormElements(adForm);
};

// Перевод формы в активную форму + активация полей

const enableFilter = () => {
  mapForm.classList.remove('map__filters--disabled');
  setEnabledFormElements(mapForm);
};

// Перевод фильтров в активное состояние

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  setEnabledFormElements(adForm);
};

export { disableForm, enableForm, disableFilter, enableFilter };


