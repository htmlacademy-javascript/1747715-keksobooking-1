import { enableForm, enableFilter, disableFilter } from './form.js';
import { renderAnnouncement } from './popup.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const map = L.map('map-canvas');
const addressInput = document.querySelector('#address');
const defaultLatitude = 35.68700;
const defaultLongitude = 139.753475;
const setViewLongitude = 139.753490;

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52]
});

const mainPinMarker = L.marker(
  {
    lat: defaultLatitude,
    lng: defaultLongitude,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const commonPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40]
});

addressInput.value = mainPinMarker.getLatLng();

const setLatLng = () => {
  mainPinMarker.setLatLng({
    lat: defaultLatitude,
    lng: defaultLongitude,
  });
  addressInput.value = mainPinMarker.getLatLng();
};

const loadMap = () => {
  map.on('load', () => {
    enableForm();
  })
    .setView({
      lat: defaultLatitude,
      lng: setViewLongitude,
    }, 14);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    addressInput.value = evt.target.getLatLng();
  });
};

const loadData = () => {
  getData()
    .then((similarAnnouncements) => {
      similarAnnouncements.forEach(({ location }, index) => {
        const marker = L.marker({
          lat: location.lat,
          lng: location.lng,
        },
        {
          commonPinIcon
        });

        const announcementElements = renderAnnouncement(similarAnnouncements);
        const announcementElement = announcementElements[index];
        const popup = L.popup()
          .setContent(announcementElement);

        marker
          .addTo(map)
          .bindPopup(popup);
      });
    })
    .then(enableFilter())
    .catch((err) => {
      disableFilter();
      showAlert(err.message);
    });
};

export { loadMap, loadData, setLatLng, addressInput, map };
