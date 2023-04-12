export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = selector;
  }

  getItems(items) {
    this._renderedItems = items;
  }

  renderItems(id) {
    this._renderedItems.forEach(item => {
      this._renderer(item, id);
    })
  }

  addItemReverse(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}