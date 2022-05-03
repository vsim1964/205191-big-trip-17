import {
  getRandomInteger,
  humanizeDateDueDate,
  humanizeFromDueDate,
  humanizeToDueDate,
  getDiffTime
} from './utils.js';

// import {
//   arrayDestinations
// } from './destinations.js';

// import {
//   arrayPoints
// } from './points.js';

import {
  ARRAY_OFFERS
} from './offers.js';

const DATES_FROM = ['2019-07-10T22:55:56.845Z', '2019-07-11T23:55:56.845Z', '2019-07-12T20:55:56.845Z'];
const DATES_TO = ['2019-07-10T22:55:56.845Z', '2019-07-11T22:55:56.845Z', '2019-07-12T22:55:56.845Z'];
const TYPES = ['Taxi', 'Drive', 'Flight'];
const DESTINATIONS = ['London', 'Geneva', 'Rome'];
const PRICES = ['80', '100', '200'];
const FAVORITE_FALSE = '';
const FAVORITE_TRUE = 'event__favorite-btn--active';
const IS_FAVORITES = [FAVORITE_FALSE, FAVORITE_TRUE];


export const generatePoint = () => ({
  date: humanizeDateDueDate(DATES_FROM[getRandomInteger(0, DATES_FROM.length - 1)]),
  basePrice: PRICES[getRandomInteger(0, PRICES.length - 1)],
  dateFrom: humanizeFromDueDate(DATES_FROM[getRandomInteger(0, DATES_FROM.length - 1)]),
  dateTo: humanizeToDueDate(DATES_TO[getRandomInteger(0, DATES_TO.length - 1)]),
  diffTime: getDiffTime(DATES_TO[getRandomInteger(0, DATES_TO.length - 1)], DATES_FROM[getRandomInteger(0, DATES_FROM.length - 1)]),
  destination: DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)],
  id: '0',
  isFavorite: IS_FAVORITES[getRandomInteger(0, 1)],
  offers: ARRAY_OFFERS[getRandomInteger(0, ARRAY_OFFERS.length - 1)].offers[getRandomInteger(0, 1)].title,
  price: ARRAY_OFFERS[getRandomInteger(0, ARRAY_OFFERS.length - 1)].offers[getRandomInteger(0, 1)].price,
  type: TYPES[getRandomInteger(0, TYPES.length - 1)]
});
