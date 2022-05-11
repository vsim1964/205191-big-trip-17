import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import AddEditView from '../view/add-edit-view.js';
// import EmptyView from '../view/empty-view.js';
import { render } from '../render.js';

export default class ListPresenter {
  #listContainer = null;
  #eventsComponent = new EventsView();
  #listComponent = new ListView();
  #pointModel = null;
  #listPoints = null;

  init = (listContainer, point) => {

    this.#renderList(listContainer, point);
  };

  #renderPoint = (point) => {
    const addEditComponent = new AddEditView(point);
    const pointComponent = new PointView(point);

    const replacePointToForm = () => {
      this.#listComponent.element.replaceChild(addEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listComponent.element.replaceChild(pointComponent.element, addEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    addEditComponent.element.querySelector('.event__save-btn').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listComponent.element);
  };

  #renderList = (listContainer, point) => {

    this.#listContainer = listContainer;
    this.#pointModel = point;
    this.#listPoints = [...this.#pointModel.getPoints()];

    render(this.#eventsComponent, this.#listContainer);
    render(new SortView(), this.#eventsComponent.element);
    render(this.#listComponent, this.#eventsComponent.element);

    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i]);
    }
  };
}
