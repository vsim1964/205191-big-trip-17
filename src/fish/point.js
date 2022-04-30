import {
  getRandomInteger
} from './random.js';

const generateDestinations = () => {
  const destinations = ['London', 'Paris', 'Grenoble', 'Geneva', 'Vienna', 'Venice', 'Florence', 'Genoa', 'Rome'];
  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};

const generateIndex = () => {
  const randomIndex = getRandomInteger(0, 1);
  return randomIndex;
};

const offers = {
  'type': 'taxi',
  'offers': [{
    'id': 1,
    'title': 'Upgrade to a business class',
    'price': 120
  }, {
    'id': 2,
    'title': 'Choose the radio station',
    'price': 60
  }]
};

export const generatePoint = () => ({
  'base_price': 1100,
  'date_from': '2019-07-10T22:55:56.845Z',
  'date_to': '2019-07-11T11:22:13.375Z',
  'destination': generateDestinations(),
  'id': '0',
  'is_favorite': false,
  'offers': offers.offers[generateIndex],
  'type': 'bus'
});
