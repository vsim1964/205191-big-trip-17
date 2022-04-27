import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import ItemView from '../view/list-item-view.js';
import {
  render
} from '../render.js';


export default class ListPresenter {
  eventsComponent = new EventsView();
  listComponent = new ListView();


  init = (listContainer) => {
    this.listContainer = listContainer;

    render(this.eventsComponent, this.listContainer);
    render(new SortView(), this.eventsComponent.getElement());
    render(this.listComponent, this.eventsComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ItemView(), this.listComponent.getElement());
    }
  };
}
