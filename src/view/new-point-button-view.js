import AbstractView from '../framework/view/abstract-view';

const createNewPointButtonTemplate = () =>
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewPointButton extends AbstractView  {

  get template() {
    return createNewPointButtonTemplate();
  }

  setEventHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#eventHandler);
  };

  #eventHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
