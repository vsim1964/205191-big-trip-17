import AbstractView from '../framework/view/abstract-view.js';

const createEmptyTemplate = () =>
  '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class EmptyView extends AbstractView  {

  get template() {
    return createEmptyTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
