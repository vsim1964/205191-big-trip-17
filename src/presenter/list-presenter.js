import {render, RenderPosition} from '../framework/render.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EmptyView from '../view/empty-view.js';
import PointPresenter from './point-presenter';
import {sortTime, sortPrice} from '../mock/utils/util-sort';
import {SortType} from '../mock/utils/util-sort';
import {UpdateType, UserAction} from '../mock/utils/util-action_update';
import {filter} from '../mock/utils/util-fiter';

export default class ListPresenter {
  #listContainer = null;
  #eventsComponent = new EventsView();
  #listComponent = new ListView();
  #sortComponent = null;
  #emptyComponent = new EmptyView();
  #pointModel = null;
  #filterModel = null;
  #listPoints = null;
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(listContainer, pointModel,  filterModel) {
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.tasks;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
    }
    return filteredPoints;
  }

  init = () => {
    this.#renderList();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true});
        this.#renderList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    // - Очищаем список
    this.#clearList();
    // - Рендерим список заново
    this.#renderList();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearList = ({resetSortType = false}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderList = (listContainer, point) => {
    this.#listContainer = listContainer;
    this.#pointModel = point;
    this.#listPoints = [...this.#pointModel.getPoints()];

    render(this.#eventsComponent, this.#listContainer);
    this.#renderSort(this.#listPoints[i]);
    render(this.#listComponent, this.#eventsComponent.element);

    if (this.#listPoints.length > 0) {
      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i]);
        this.#renderSort(this.#listPoints[i]);
      }
    } else {
      render(this.#emptyComponent, this.#listComponent.element);
    }
  };
}
