import AbstractView from '../framework/view/abstract-view.js';

const createNewPointTemplate = () => `
<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
`;

export default class NewPointView extends AbstractView  {

  get template() {
    return createNewPointTemplate();
  }

  setRouteHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#newPointHandler);
  };

  #newPointHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
