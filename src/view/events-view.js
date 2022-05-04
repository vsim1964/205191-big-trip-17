import { createElement } from "../render.js";

const createTripEventsTemplate = () =>
  '<section class="trip-events"></section>';

export default class EventsView {
  #element = null;

  constructor(point) {
    this.point = point;
  }

  get template() {
    return createTripEventsTemplate(this.point);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.element = null;
  }
}
