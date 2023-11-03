import { getFeatureRank } from './util.js';

const DEFAULT_OPTION_VALUE = 'any';

const priceRange = {

  'middle': {
    min: 10000,
    max: 50000
  },
  'low': {
    max: 10000
  },
  'high': {
    min: 50000
  }
};

const typeOfHousingSelect = document.querySelector('[name="housing-type"]');
const priceSelect = document.querySelector('[name="housing-price"]');
const roomsCountSelect = document.querySelector('[name="housing-rooms"]');
const guestsCountSelect = document.querySelector('[name="housing-guests"]');
const mapFeaturesFieldset = document.querySelector('.map__features');

const showByTypeOfHousing = ({offer}) => typeOfHousingSelect.value === DEFAULT_OPTION_VALUE ? true : offer.type === typeOfHousingSelect.value;

const showByPrice = ({offer}) => {
  const priceOption = priceSelect.value;

  if (priceOption === DEFAULT_OPTION_VALUE) {
    return true;
  }

  const {min = -Infinity, max = Infinity} = priceRange[priceOption];
  return offer.price >= min && offer.price <= max;

};

const showByRoomsCount = ({offer}) => {
  if (roomsCountSelect.value === DEFAULT_OPTION_VALUE) {
    return true;
  }
  return offer.rooms === +roomsCountSelect.value;
};

const showByGuestsCount = ({offer}) => {
  if (guestsCountSelect.value === DEFAULT_OPTION_VALUE) {
    return true;
  }
  return offer.guests === +guestsCountSelect.value;
};

const showByFeatures = (announcementA, announcementB) => {
  const rankA = getFeatureRank(announcementA);
  const rankB = getFeatureRank(announcementB);

  return rankB - rankA;
};

export { showByTypeOfHousing, showByPrice, typeOfHousingSelect, priceSelect, showByRoomsCount, roomsCountSelect, guestsCountSelect, showByGuestsCount, mapFeaturesFieldset, showByFeatures };
