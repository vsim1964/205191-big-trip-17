import {filter} from '../utils.js';

export const generateFilter = () => Object.entries(filter).map(
  ([filterName]) => ({
    name: filterName,
    count: 99, // filterPoints(points).length
  }),
);
