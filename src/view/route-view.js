import AbstractView from '../framework/view/abstract-view.js';
import { ARRAY_DESTINATIONS } from '../mock/destinations.js';

const start = ARRAY_DESTINATIONS[0].name;
const finish = ARRAY_DESTINATIONS[ARRAY_DESTINATIONS.length - 1].name;

const createRouteTemplate = () => `
<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
       <h1 class="trip-info__title">${start} - ${finish}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
            Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
</section>
`;

export default class RouteView extends AbstractView  {

  get template() {
    return createRouteTemplate();
  }

  setRouteHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#routeHandler);
  };

  #routeHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
