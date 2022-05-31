import {render, RenderPosition, remove} from '../framework/render.js';
import AddView from '../view/add-view.js';
import {nanoid} from 'nanoid';
import {UpdateType, UserAction} from '../mock/utils/util-action_update';

export default class PointNewPresenter {
  #listComponent = null;
  #changeData = null;
  #addComponent = null;
  #destroyCallback = null;

  constructor(listComponent, changeData) {
    this.#listComponent = listComponent;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#addComponent !== null) {
      return;
    }

    this.#addComponent = new AddView();
    this.#addComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#addComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#addComponent, this.#listComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#addComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#addComponent);
    this.#addComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
