import {
  createElement
} from '../render.js';

const createEditorFormTemplate = () => `

`;

export default class EditorForm {
  getTemplate() {
    return createEditorFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
