import {render, RenderPosition} from '../framework/render.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EmptyView from '../view/empty-view.js';
import PointPresenter from './point-presenter';
import {findUpdatePoint} from '../mock/utils/util-update';
import {sortTime, sortPrice} from '../mock/utils/util-sort';
import {SortType} from '../mock/utils/util-sort';

export default class ListPresenter {
  #listContainer = null;
  #eventsComponent = new EventsView();
  #listComponent = new ListView();
  #sortComponent = new SortView();
  #pointModel = null;
  #listPoints = null;
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

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

  init = (listContainer, point) => {
    this.#renderList(listContainer, point);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updateDataPoint) => {
    this.#listPoints = findUpdatePoint(this.#listPoints, updateDataPoint);
    this.#pointPresenter.get(updateDataPoint.id).init(updateDataPoint);
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
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handlePointChange, this.#handleModeChange);
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
      render(new EmptyView(), this.#listComponent.element);
    }
  };
}
