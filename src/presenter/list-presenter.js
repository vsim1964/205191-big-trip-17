import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import AddEditView from '../view/add-edit-view.js';
import {
  RenderPosition,
  render
} from '../render.js';


export default class ListPresenter {
  eventsComponent = new EventsView();
  listComponent = new ListView();
  addEditComponent = new AddEditView();


  init = (listContainer, pointModel) => {
    this.listContainer = listContainer;
    this.pointModel = pointModel;
    this.listPoints = [...this.pointModel.getPoints()];

    render(this.eventsComponent, this.listContainer);
    render(new SortView(), this.eventsComponent.getElement());
    render(this.listComponent, this.eventsComponent.getElement());

    render(this.addEditComponent, this.listComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new PointView(this.listPoints[i]), this.listComponent.getElement());
    }

  };
}
