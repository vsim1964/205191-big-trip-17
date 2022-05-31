import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../mock/utils/util-filter';

const EmptyTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future points now',
  [FilterType.PAST]: 'There are no past points today',
};

const createEmptyTemplate = (filterType) => {
  const EmptyTextValue = EmptyTextType[filterType];

  return `<p class="trip-events__msg">${EmptyTextValue}</p>`;

};

export default class EmptyView extends AbstractView  {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyTemplate(this.#filterType);
  }

  setEmptyHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#emptyHandler);
  };

  #emptyHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
