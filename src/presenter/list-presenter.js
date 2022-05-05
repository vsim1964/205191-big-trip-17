import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import AddEditView from '../view/add-edit-view.js';
import EmptyView from '../view/empty-view.js';

import { RenderPosition, render } from '../render.js';

export default class ListPresenter {
  #listContainer = null;
  #pointModel = null;
  #listPoints = null;
  #defaultPointModel = null;
  #defaultPoint = null;
  #eventsComponent = new EventsView();
  #listComponent = new ListView();


  init = (listContainer, pointModel, defaultPointModel) => {
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
    this.#listPoints = [...this.#pointModel.getPoints()];
    this.#defaultPointModel = defaultPointModel;
    this.#defaultPoint = this.#defaultPointModel.getDefaultPoints();

    render(this.#eventsComponent, this.#listContainer);
    render(new SortView(), this.#eventsComponent.element);
    render(this.#listComponent, this.#eventsComponent.element);

    render(
      new AddEditView(this.#defaultPoint),
      this.#listComponent.element,
      RenderPosition.AFTERBEGIN
    );

    if (PointView !== null) {
      for (let i = 0; i < this.#listPoints.length; i++) {
        render(new PointView(this.#listPoints[i]), this.#listComponent.element);
      }
    } else {
      render(new EmptyView(), this.#listComponent.element);
    }
  };

  renderPoint = (point, defaultPoint) => {
    const addEditComponent = new AddEditView();
    const pointComponent = new PointView(point);
    const listComponent = new ListView(defaultPoint);

    const replacePointToForm = () => {
      this.#eventsComponent.element.replaceChild(addEditComponent.element, listComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#eventsComponent.element.replaceChild(listComponent.element, addEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    addEditComponent.element.element.querySelector('.event__save-btn').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#eventsComponent.element);
  };

}
