import Observable from '../framework/observable.js';
import {
  generatePoint
} from '../mock/generate-point.js';

export default class PointsModel extends Observable {
  #points = Array.from({
    length: 9
  }, generatePoint);

  getPoints = () => this.#points;
}
