import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import AddEditView from '../view/add-edit-view.js';
import EmptyView from '../view/empty-view.js';

import {
  RenderPosition,
  render
} from '../render.js';


export default class ListPresenter {
  eventsComponent = new EventsView();
  listComponent = new ListView();

  init = (listContainer, pointModel, defaultPointModel) => {
    this.listContainer = listContainer;
    this.pointModel = pointModel;
    this.listPoints = [...this.pointModel.getPoints()];
    this.defaultPointModel = defaultPointModel;
    this.defaultPoint = this.defaultPointModel.getDefaultPoints();

    render(this.eventsComponent, this.listContainer);
    render(new SortView(), this.eventsComponent.getElement());
    render(this.listComponent, this.eventsComponent.getElement());

    render(new AddEditView(this.defaultPoint), this.listComponent.getElement(), RenderPosition.AFTERBEGIN);

    if (PointView !== null) {
      for (let i = 0; i < this.listPoints.length; i++) {
        render(new PointView(this.listPoints[i]), this.listComponent.getElement());
      }
    } else {
      render(new EmptyView(), this.listComponent.getElement());
    }
  };
}
