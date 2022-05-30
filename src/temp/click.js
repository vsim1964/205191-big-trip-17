// ! PointPresenter.init


this.#pointComponent.setEditClickHandler(this.#handleEditClick);
this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
this.#addEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

#handleEditClick = () => {
	this.#replaceCardToForm();
 };

 #handleFavoriteClick = () => {
	this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
 };

 #handleFormSubmit = (point) => {
	this.#changeData(point);
	this.#replaceFormToCard();
 };

// ! PointView

setEditClickHandler = (callback) => {
	this._callback.editclick = callback;
	this.element.querySelector('.').addEventListener('click', this.#editClickHandler);
 };

 #editClickHandler = (evt) => {
	evt.preventDefault();
	this._callback.editclick();
 };

 setFavoriteClickHandler = (callback) => {
	this._callback.favoriteClick = callback;
	this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
 };

 #favoriteClickHandler = (evt) => {
	evt.preventDefault();
	this._callback.favoriteClick();
 };


 // ! EditView

 setFormSubmitHandler = (callback) => {
	this._callback.formSubmit = callback;
	//  this._callback.formSubmit(AddEditView.parseStateToPoint(this._state));
	this.element.addEventListener('submit', this.#formSubmitHandler);
	this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
 };

 _restoreHandlers = () => {
	this.#setInnerHandlers();
	this.setFormSubmitHandler(this._callback.formSubmit);
 };

 #formSubmitHandler = (evt) => {
	evt.preventDefault();
	this._callback.formSubmit(this._state);
 };
