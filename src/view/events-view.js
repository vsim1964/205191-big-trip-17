import AbstractView from '../framework/view/abstract-view.js';

const createTripEventsTemplate = () =>
  '<section class="trip-events"></section>';

export default class EventsView extends AbstractView  {

  get template() {
    return createTripEventsTemplate();
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
