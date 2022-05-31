import Observable from '../framework/observable.js';
import {FilterType} from '../mock/utils/util-filter';
// import {UpdateType} from '../mock/utils/util-action_update';

export default class FilterModel extends Observable {
  #filter = FilterType.ALL;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
