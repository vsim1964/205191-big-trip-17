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
  arrayOffers
} from './offers.js';

const datesFrom = ['2019-07-10T22:55:56.845Z', '2019-07-11T23:55:56.845Z', '2019-07-12T20:55:56.845Z', '2019-07-13T19:55:56.845Z', '2019-07-14T18:55:56.845Z', '2019-07-15T17:55:56.845Z', '2019-07-16T16:55:56.845Z', '2019-07-17T15:55:56.845Z', '2019-07-18T06:55:56.845Z'];
const datesTo = ['2019-07-10T22:55:56.845Z', '2019-07-11T22:55:56.845Z', '2019-07-12T22:55:56.845Z', '2019-07-13T22:55:56.845Z', '2019-07-14T22:55:56.845Z', '2019-07-15T22:55:56.845Z', '2019-07-16T22:55:56.845Z', '2019-07-17T22:55:56.845Z', '2019-07-18T22:55:56.845Z'];

const types = ['Taxi', 'Drive', 'Flight'];
const destinations = ['London', 'Geneva', 'Rome'];
const prices = ['80', '100', '200'];


const favoriteFalse = '';
const favoriteTrue = 'event__favorite-btn--active';
const isFavorites = [favoriteFalse, favoriteTrue];


export const generatePoint = () => ({
  'date': humanizeDateDueDate(datesFrom[getRandomInteger(0, datesFrom.length - 1)]),
  'base_price': prices[getRandomInteger(0, prices.length - 1)],
  'date_from': humanizeFromDueDate(datesFrom[getRandomInteger(0, datesFrom.length - 1)]),
  'date_to': humanizeToDueDate(datesTo[getRandomInteger(0, datesTo.length - 1)]),
  'diffTime': getDiffTime(datesTo[getRandomInteger(0, datesTo.length - 1)], datesFrom[getRandomInteger(0, datesFrom.length - 1)]),
  'destination': destinations[getRandomInteger(0, destinations.length - 1)],
  'id': '0',
  'is_favorite': isFavorites[getRandomInteger(0, 1)],
  'offers': arrayOffers[getRandomInteger(0, arrayOffers.length - 1)].offers[getRandomInteger(0, 1)].title,
  'price': arrayOffers[getRandomInteger(0, arrayOffers.length - 1)].offers[getRandomInteger(0, 1)].price,
  'type': types[getRandomInteger(0, types.length - 1)]
});
