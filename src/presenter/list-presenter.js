import {render, replace} from '../framework/render.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import AddEditView from '../view/add-edit-view.js';
import EmptyView from '../view/empty-view.js';

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

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replace(pointComponent, addEditComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setPointHandler(() => {
      replace(addEditComponent, pointComponent);
      document.addEventListener('keydown', onEscKeyDown);
    });

    addEditComponent.setEditHandler(() => {
      replace(pointComponent, addEditComponent);
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

    if (this.#listPoints.length > 0) {
      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i]);
      }
    } else {
      render(new EmptyView(), this.#listComponent.element);
    }
  };
}
