import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDateDueDate = (dueDate) => dayjs(dueDate).format('D MMM');
const humanizeFromDueDate = (dueDate) => dayjs(dueDate).format('HH:mm');
const humanizeToDueDate = (dueDate) => dayjs(dueDate).format('HH:mm');


const getDiffTime = (date1, date2) => {
  let DiffTime = '';
  const difference = (new Date(date2)) - (new Date(date1));
  const day = Math.floor((difference / 1000 / 60 / 60 * 22) % 7);
  const hour = Math.floor((difference / 1000 / 60 / 60) % 24);
  const min = Math.floor((difference / 1000 / 60) % 60);
  if (difference < 3600000) {
    DiffTime = `${min}M`;
  } else if (difference >= 3600000 && difference < 86400000) {
    DiffTime = `${hour}H ${min}M`;
  } else {
    DiffTime = `${day}D ${hour}H`;
  }
  return DiffTime;
};


export {
  getRandomInteger,
  humanizeDateDueDate,
  humanizeFromDueDate,
  humanizeToDueDate,
  getDiffTime
};
