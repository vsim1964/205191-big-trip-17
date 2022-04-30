import {
  generatePoint
} from '../fish/point.js';

export default class PointsModel {
  points = Array.from({
    length: 9
  }, generatePoint);

  getPoints = () => this.points;
}
