import {render} from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import RouteView from './view/route-view.js';
import FilterModel from './model/filter-model.js';


const siteHeaderElement = document.querySelector('.page-header');
const tripMain = siteHeaderElement.querySelector('.trip-main');

const siteMainElement = document.querySelector('.page-main');
const listContainer = siteMainElement.querySelector('.page-body__container');

const list = new ListPresenter();
const pointModel = new PointsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(tripMain, filterModel, pointModel);

render(new RouteView(), tripMain, 'afterbegin' );

filterPresenter.init();
list.init(listContainer, pointModel);
