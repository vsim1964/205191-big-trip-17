import FilterView from './view/filter-view.js';
import {
  render
} from './render.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const controlsFilters = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const listContainer = siteMainElement.querySelector('.page-body__container');

const list = new ListPresenter();
const point = new PointsModel();

render(new FilterView(), controlsFilters);

list.init(listContainer, point);
