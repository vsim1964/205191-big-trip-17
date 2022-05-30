+ метод клика по элементу this.element ОБЪЕКТ СОБЫТИЯ

у объекта this - есть цепочка  _callback.click === callback

```javascript
setClickHandler = (callback) => {
	this._callback.click = callback;
	this.element.addEventListener('click', this.#clickHandler);
}

#clickHandler = (evt) => {
evt.preventDefault();
this._callback.click()   // в презентере передается то, что сделается
}
// презентер
this.#сomponent.setClickHandler(this.#handleClick); =>


  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

```
