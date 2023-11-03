import { priceInput, typeOfHousingSelect, typeOfHousingOptions } from './validator.js';

const MAX_PRICE = 50000;
const SLIDER_COUNT_START = 80;

const sliderElement = document.querySelector('.ad-form__slider');

const getMinPrice = () => {
  const typeOfHousing = typeOfHousingSelect.value;
  const minPrice = typeOfHousingOptions[typeOfHousing].minPrice;
  priceInput.min = minPrice;
  return minPrice;
};

noUiSlider.create(sliderElement, {
  range: {
    min: getMinPrice(),
    max: MAX_PRICE,
  },
  start: SLIDER_COUNT_START,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('change', () => {
  priceInput.value = sliderElement.noUiSlider.get();
});

typeOfHousingSelect.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: getMinPrice(),
      max: MAX_PRICE
    }
  });
});

export { sliderElement };
