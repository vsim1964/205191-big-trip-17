import { createElement } from "../render.js";

const createListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ListView {
  #element = null;

  constructor(point) {
    this.point = point;
  }

  get template() {
    return createListTemplate(this.point);
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
