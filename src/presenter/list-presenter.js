import {render, RenderPosition} from '../framework/render.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EmptyView from '../view/empty-view.js';
import PointPresenter from './point-presenter';
import {sortTime, sortPrice} from '../mock/utils/util-sort';
import {SortType} from '../mock/utils/util-sort';
import {UpdateType, UserAction} from '../mock/utils/util-action_update';

export default class ListPresenter {
  #listContainer = null;
  #eventsComponent = new EventsView();
  #listComponent = new ListView();
  #sortComponent = new SortView();
  #emptyComponent = new EmptyView();
  #pointModel = null;
  #listPoints = null;
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(listContainer, pointModel) {
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        this.#listPoints.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#listPoints.sort(sortPrice);
        break;
    }
    return this.#pointModel.points;
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
        // - обновить список
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску
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
    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
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
