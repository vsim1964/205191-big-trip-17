import {render} from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import RouteView from './view/route-view.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view';

const siteHeaderElement = document.querySelector('.page-header');
const tripMain = siteHeaderElement.querySelector('.trip-main');

const siteMainElement = document.querySelector('.page-main');
const listContainer = siteMainElement.querySelector('.page-body__container');
const newPointButtonComponent = new NewPointButtonView();

const pointModel = new PointsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(tripMain, filterModel, pointModel);
const list = new ListPresenter(listContainer, pointModel, filterModel);

render(new RouteView(), tripMain, 'afterbegin' );

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  list.createTask(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, tripMain);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

filterPresenter.init();
list.init();
