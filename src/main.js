import {
  render
} from './render.js';
import ListPresenter from './presenter/list-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const controlsFilters = siteHeaderElement.querySelector('.trip - controls__filters');

const siteMainElement = document.querySelector('.page-main');
// const siteTripEvents = siteMainElement.querySelector('.trip-events');

const list = new ListPresenter();


list.init(controlsFilters);
list.init(siteMainElement);
