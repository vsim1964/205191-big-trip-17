import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { ARRAY_OFFERS } from '../mock/offers.js';
import { ARRAY_DESTINATIONS } from '../mock/destinations.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createAddEditTemplate = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destinations,
    type
  } = point;

  const pointTypeOffer = ARRAY_OFFERS.find((offer) => offer.type === point.type);
  const chunkOffers = pointTypeOffer.offers;
  const getMarkupOffer = (offer) => `
  <div class="event__available-offers">
   <div class="event__offer-selector">
		<input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-luggage"
			checked>
		<label class="event__offer-label" for="${offer.id}">
			<span class="event__offer-title">${offer.title}</span>
			&plus;&euro;&nbsp;
			<span class="event__offer-price">${offer.price}</span>
		</label>
	</div>
	</div>`;
  const stringOffers = chunkOffers.map(getMarkupOffer);

  const pointTypeDestination = ARRAY_DESTINATIONS.find((destination) => destination.name === destinations);
  const getMarkupDestination = () => `
<p class="event__destination-description">${pointTypeDestination.description}</p>
<div class="event__photos-container">
	<div class="event__photos-tape">
		<img class="event__photo" src="${pointTypeDestination.pictures[0].src}" alt="${pointTypeDestination.pictures[0].description}">
	</div>
</div>`;


  return `
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
	 <div class="event__type-wrapper">
		<label class="event__type  event__type-btn" for="event-type-toggle-1">
		  <span class="visually-hidden">Choose event type</span>
		  <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
		</label>
		<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

		<div class="event__type-list">
		  <fieldset class="event__type-group">
			 <legend class="visually-hidden">Event type</legend>

			 <div class="event__type-item">
				<input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
				<label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
			 </div>

			 <div class="event__type-item">
				<input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
				<label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
			 </div>

			 <div class="event__type-item">
				<input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
				<label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
			 </div>

			 <div class="event__type-item">
				<input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
				<label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
			 </div>

			 <div class="event__type-item">
				<input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
				<label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
			 </div>

			 <div class="event__type-item">
				<input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
				<label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
			 </div>

			 <div class="event__type-item">
				<input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
				<label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
			 </div>

			 <div class="event__type-item">
				<input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
				<label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
			 </div>

			 <div class="event__type-item">
				<input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
				<label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
			 </div>
		  </fieldset>
		</div>
	 </div>

	 <div class="event__field-group  event__field-group--destination">
		<label class="event__label  event__type-output" for="event-destination-1">
		${type}
		</label>
		<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations}" list="destination-list-1">
		<datalist id="destination-list-1">
		<option value="${destinations}"></option>
		<option value="${destinations}"></option>
		<option value="${destinations}"></option>
		</datalist>
	 </div>

	 <div class="event__field-group  event__field-group--time">
		<label class="visually-hidden" for="event-start-time-1">From</label>
		<input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
		&mdash;
		<label class="visually-hidden" for="event-end-time-1">To</label>
		<input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
	 </div>

	 <div class="event__field-group  event__field-group--price">
		<label class="event__label" for="event-price-1">
		  <span class="visually-hidden">Price</span>
		  &euro;
		</label>
		<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
	 </div>

	 <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
	 <button class="event__reset-btn" type="reset">Delete</button>
	 <button class="event__rollup-btn" type="button">
		<span class="visually-hidden">Open event</span>
	 </button>
  </header>
  <section class="event__details">
	 <section class="event__section  event__section--offers">
		<h3 class="event__section-title  event__section-title--offers">Offers</h3>
		${stringOffers}
	 </section>

	 <section class="event__section  event__section--destination">
		<h3 class="event__section-title  event__section-title--destination">Destination</h3>

		${getMarkupDestination()}
		</section>
  </section>
</form>`;
};

export default class AddEditView extends AbstractStatefulView {
  #datefrompicker = null;
  #datetopicker = null;

  constructor(point) {
    super();
    this._state = AddEditView.parsePointToState(point);
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  get template() {
    return createAddEditTemplate(this._state);
  }

  #typeInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  removeElement = () => {
    super.removeElement();

    if (this.#setDateFromPicker) {
      this.#setDateFromPicker.destroy();
      this.#setDateFromPicker = null;
    }
	 if (this.#setDateToPicker) {
      this.#setDateToPicker.destroy();
      this.#setDateToPicker = null;
    }
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    //  this._callback.formSubmit(AddEditView.parseStateToPoint(this._state));
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._state);
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDateFromPicker = () => {
    if (this._state.dateFrom) {
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      this.#datefrompicker = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          dateFormat: 'Y/m/d H:i',
          defaultDate: this._state.dateFrom,
          onChange: this.#dateFromChangeHandler, // На событие flatpickr передаём наш колбэк
        },
      );
    }
  };

  #setDateToPicker = () => {
    if (this._state.dateTo) {
      this.#datetopicker = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          dateFormat: 'Y/m/d H:i',
          defaultDate: this._state.dateTo,
          onChange: this.#dateToChangeHandler, // На событие flatpickr передаём наш колбэк
        },
      );
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-input').addEventListener('click', this.#typeInputHandler);
  };

  static parsePointToState = (point) => ({
    ...point,
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };
    return point;
  };
}
