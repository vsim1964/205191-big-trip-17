import AbstractView from '../framework/view/abstract-view.js';

const createTripEventsTemplate = () =>
  '<section class="trip-events"></section>';

export default class EventsView extends AbstractView  {

  get template() {
    return createTripEventsTemplate();
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
