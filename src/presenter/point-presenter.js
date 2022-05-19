import {render, replace} from '../framework/render.js';
import PointView from '../view/point-view.js';
import AddEditView from '../view/add-edit-view.js';

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #addEditComponent = null;
  #changeData = null;
  #point = null;

  constructor(listComponent, changeData) {
    this.#listComponent = listComponent;
    this.#changeData = changeData;
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

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

    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    render(this.#pointComponent, this.#listComponent);
  };
}
