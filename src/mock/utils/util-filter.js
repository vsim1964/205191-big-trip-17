const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const now = new Date();
const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point === true),
  [FilterType.FUTURE]: (points) => points.filter((point) => now < point.dateFrom),
  [FilterType.PAST]: (points) => points.filter((point) => now < point.dateTo),
};

export { FilterType, filter };
