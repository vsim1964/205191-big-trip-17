import {render} from '../framework/render.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EmptyView from '../view/empty-view.js';
import PointPresenter from './point-presenter';
import {updatePoint} from '../mock/utils/util-update';

export default class ListPresenter {
  #listContainer = null;
  #eventsComponent = new EventsView();
  #listComponent = new ListView();
  #pointModel = null;
  #listPoints = null;
  #pointPresenter = null;

  init = (listContainer, point) => {
    this.#renderList(listContainer, point);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#listPoints = updatePoint(this.#listPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
  };

  #renderList = (listContainer, point) => {
    this.#listContainer = listContainer;
    this.#pointModel = point;
    this.#listPoints = [...this.#pointModel.getPoints()];

    render(this.#eventsComponent, this.#listContainer);
    render(new SortView(), this.#eventsComponent.element);
    render(this.#listComponent, this.#eventsComponent.element);

    if (this.#listPoints.length > 0) {
      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i]);
      }
    } else {
      render(new EmptyView(), this.#listComponent.element);
    }
  };
}
