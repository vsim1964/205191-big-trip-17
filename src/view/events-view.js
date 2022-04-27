import {
  createElement
} from '../render.js';

const createTripEventsTemplate = () => '<section class="trip-events"></section>';

export default class FilterView {
  getTemplate() {
    return createTripEventsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
