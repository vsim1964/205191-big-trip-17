import CreationForm from '../view/creation-form-view.js';
import EditorForm from '../view/editor-form-view.js';
import SortView from '../view/sort-view.js';
import FiterView from '../view/fiter-view.js';
import WayPoint from '../view/way-point-view.js';
import {
  render
} from '../render.js';


export default class ListPresenter {


  init = (listContainer) => {
    this.listContainer = listContainer;

    render(new EditorForm(), this.listContainer);
    render(new CreationForm(), this.listContainer);
    render(new SortView(), this.listContainer);
    render(new FiterView(), this.listContainer);
    for (let i = 0; i < 3; i++) {
      render(new WayPoint(), this.listContainer);
    }
  };
}
