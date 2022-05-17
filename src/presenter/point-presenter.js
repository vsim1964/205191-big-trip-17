import {render, replace} from '../framework/render.js';
import PointView from '../view/point-view.js';
import AddEditView from '../view/add-edit-view.js';

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #addEditComponent = null;
  #point = null;

  constructor(listComponent) {
    this.#listComponent = listComponent;
  }


  init = (point) => {
    this.#point = point;
    this.#addEditComponent = new AddEditView(point);
    this.#pointComponent = new PointView(point);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replace(this.#pointComponent, this.#addEditComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#pointComponent.setPointHandler(() => {
      replace(this.#addEditComponent, this.#pointComponent);
      document.addEventListener('keydown', onEscKeyDown);
    });

    this.#addEditComponent.setEditHandler(() => {
      replace(this.#pointComponent, this.#addEditComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#pointComponent, this.#listComponent);
  };
}
