import { showErrorMessage } from './messages.js';
import { sendData } from './api.js';
import { setLatLng, map, loadData } from './map.js';
import { clearAvatarImage, clearHousingImage } from './load-image.js';

const form = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');
const roomNumberSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
const typeOfHousingSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');

const roomOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['не для гостей']
};

const times = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00',
};

const typeOfHousingOptions = {
  'bungalow': {
    minPrice: 0,
    placeholder: '0'
  },
  'flat': {
    minPrice: 1000,
    placeholder: '1000'
  },
  'hotel': {
    minPrice: 3000,
    placeholder: '3000'
  },
  'house': {
    minPrice: 5000,
    placeholder: '5000'
  },
  'palace': {
    minPrice: 10000,
    placeholder: '10000'
  }
};

// Функция, которая синхронизирует время заезда и выезда

const setTime = () => {
  const timeIn = timeInSelect.value;
  timeOutSelect.value = times[timeIn];
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

// Функция, которая синхронизирует поля количества гостей и комнат

const validateRoomAndCapacity = () => {
  const rooms = roomNumberSelect.value;
  const capacity = capacitySelect.value;
  return roomOptions[rooms].includes(capacity);
};

// Функция, которая синхронизирует поля цены и типов жилья

const validateTypeAndPrice = () => {
  const typeOfHousing = typeOfHousingSelect.value;
  const minPrice = typeOfHousingOptions[typeOfHousing].minPrice;
  const placeholder = typeOfHousingOptions[typeOfHousing].placeholder;
  priceInput.min = minPrice;
  priceInput.placeholder = placeholder;
  return priceInput.value >= minPrice;
};

// Функция, которая блокирует кнопку отправки формы

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', true);
};

// Функция, которая разблокирует кнопку отправки формы

const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
};

// Функция, которая возвращает формы и карту в изначальное состояние

const resetForms = () => {
  form.reset();
  clearAvatarImage();
  clearHousingImage();
  filters.reset();
  map.closePopup();
  loadData();
  setLatLng();
};

// Валидация полей количества комнат и количества мест

pristine.addValidator(roomNumberSelect, validateRoomAndCapacity, () => {
  const rooms = roomNumberSelect.value;
  const capacity = capacitySelect.value;
  let message = '';
  if (roomOptions['1'].includes(rooms)) {
    message = `${rooms} комната не предназначается для ${capacity} гостей`;
  } else if (roomOptions['2'].includes(rooms)) {
    message = `${rooms} комнаты не предназначаются для ${capacity} гостей`;
  } else {
    message = `${rooms} комнат не для гостей`;
  }
  return message;
});

// Валидация поля типа жилья и цены

pristine.addValidator(typeOfHousingSelect, validateTypeAndPrice, () => {
  const typeOfHousing = typeOfHousingSelect.value;
  const minPrice = typeOfHousingOptions[typeOfHousing].minPrice;
  priceInput.min = minPrice;
  return `Установите цену не ниже ${minPrice}`;
}
);

roomNumberSelect.addEventListener('change', () => {
  pristine.validate();
});

capacitySelect.addEventListener('change', () => {
  pristine.validate();
});

typeOfHousingSelect.addEventListener('change', () => {
  pristine.validate();
});

priceInput.addEventListener('change', () => {
  pristine.validate();
});

timeInSelect.addEventListener('change', setTime);

timeOutSelect.addEventListener('change', setTime);

resetButton.addEventListener('click', resetForms);

const validateForms = (onSuccess) => {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(() => {
          showErrorMessage();
        })
        .finally(() => {
          resetForms();
          unblockSubmitButton();
        });
    }
  });
};


export { validateForms, setTime, priceInput, typeOfHousingSelect, typeOfHousingOptions };
