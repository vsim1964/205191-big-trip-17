const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
};

const sortTime = (points) => {
  points.sort((a, b) => a - b);
};
const sortPrice = (points) => {
  points.sort((a, b) => a - b);
};
export {SortType, sortTime, sortPrice};
