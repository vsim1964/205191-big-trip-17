import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import RouteView from './view/route-view.js';


const siteHeaderElement = document.querySelector('.page-header');
const tripMain = siteHeaderElement.querySelector('.trip-main');

const siteMainElement = document.querySelector('.page-main');
const listContainer = siteMainElement.querySelector('.page-body__container');

const list = new ListPresenter();
const point = new PointsModel();

render(new FilterView(), tripMain, 'afterbegin'  );
render(new RouteView(), tripMain, 'afterbegin' );

list.init(listContainer, point);
