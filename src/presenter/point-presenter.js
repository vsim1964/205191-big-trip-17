import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import AddEditView from '../view/add-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #listComponent = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #addEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(listComponent, changeData, changeMode) {
    this.#listComponent = listComponent;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#addEditComponent;

    this.#addEditComponent = new AddEditView(point);
    this.#pointComponent = new PointView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#addEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPointComponent === null || prevEditComponent === null) {
      render(this.#pointComponent, this.#listComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    } else if (this.#mode === Mode.EDITING) {
      replace(this.#addEditComponent, prevEditComponent);
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#addEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm = () => {
    replace(this.#addEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#addEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite }); // callback
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToCard();
  };
}
