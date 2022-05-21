// ! ФУНКЦИЯ СРАВНИТЕЛЬ
const updatePoint = (points, update) => {
  const index = points.findIndex((point) => point.id === update.id);

  if (index === -1) {
    return points;
  }

  return [
    ...points.slice(0, index),
    update,
    ...points.slice(index + 1),
  ];
};

export { updatePoint };
/*
* update - обновляемая задача
*/
// ! ВЫЗОВ ФУНКЦИИ-СРАВНИТЕЛЯ в ОБРАБОТЧИКЕ
// => List:
#handlePointChange = (updatedData) => {
	this.#listPoints = updatePoint(this.#listPoints, updatedData);
	this.#pointPresenter.get(updatedData.id).init(updatedData);
 };
// * ???? get(updatedData.id)
// Прокидывание в class Point
// changedata  = #handlePointChange
 constructor(listComponent, changeData, changeMode) {
	this.#listComponent = listComponent;
	this.#changeData = changeData;
	this.#changeMode = changeMode;
 }
// ! ВЫЗОВ ПО КЛИКУ ОБРАБОТЧИКА #handlePointChange через метку this.#changeData
// => Point:
#handleFavoriteClick = () => {
	this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
 };
// в результате клика получаем новый объект, меняя значсение фаворит на противополжное
// * функция-клик запускаем обработчик, обработчик запускает сравнитель


#handleFormSubmit = (point) => {
	this.#changeData(point);
	this.#replaceFormToCard();
 };


 // ! POINT-VIEW подписка и запуск this.#favoriteClickHandler
 setFavoriteClickHandler = (callback) => {
	this._callback.favoriteClick = callback;
	this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
 };

 #favoriteClickHandler = (evt) => {
	evt.preventDefault();
	this._callback.favoriteClick();
 };
