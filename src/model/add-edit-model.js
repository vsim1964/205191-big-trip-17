import {
  defaultPoints
} from '../mock/points.js';


export default class AddEditModel {
  #points = defaultPoints;

  getDefaultPoints = () => this.#points;
}
