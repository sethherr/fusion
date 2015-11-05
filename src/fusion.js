import {App} from 'app';

/**
 * Fusion
 */
export class Fusion {
  /**
   * Constructor
   * @param container {String} selector to the container
   * @param type {String} type of keyboard
   */
  constructor(container, type='ergodox_ez') {
    this.type = type;
    this.container = container;
  }

  /**
   * starts the maker, adds the initial layer
   */
  start() {
    // Set initial layouts here
    var untitled;
    ReactDOM.render(<App layout={untitled}/>, document.getElementById(this.container));
  }
}
