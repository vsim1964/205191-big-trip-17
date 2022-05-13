import AbstractView from '../framework/view/abstract-view.js';

const createTripEventsTemplate = () =>
  '<section class="trip-events"></section>';

export default class EventsView extends AbstractView  {

  get template() {
    return createTripEventsTemplate();
  }
}
