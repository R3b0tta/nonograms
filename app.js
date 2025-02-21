class Component {
  /**
   * @type {Array<Component>} - An array to store child components.
   */
  #children = [];

  /**
   * @type {HTMLElement} - The HTML node associated with the component.
   */
  #node = null;

  /**
   * Creates a new Component.
   * @constructor
   * @param {Object} options - The options for creating the component.
   * @param {string=} options.tag - HTML element tag (default is 'div').
   * @param {string=} options.className - CSS class name for the element.
   * @param {string=} options.text - Text content of the element.
   * @param {...Component} children - Child components to be appended.
   */
  constructor({ tag = "div", className = "", text = "" }, ...children) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    this.#node = node;

    if (children) {
      this.appendChildren(children);
    }
  }

  /**
   * Appends a child component to the current component.
   * @param {Component} child - The child component to be appended.
   */
  append(child) {
    this.#children.push(child);
    this.#node.append(child.getNode());
  }

  /**
   * Appends an array of child components to the current component.
   * @param {Array<Component>} children - Array of child components to be appended.
   */
  appendChildren(children) {
    children.forEach((el) => {
      this.append(el);
    });
  }

  /**
   * Returns the HTML node associated with the component.
   * @returns {HTMLElement} - The HTML node.
   */
  getNode() {
    return this.#node;
  }

  /**
   * Returns an array of child components.
   * @returns {Array<Component>} - Array of child components.
   */
  getChildren() {
    return this.#children;
  }

  /**
   * Sets the text content of the component.
   * @param {string} content - The text content to be set.
   */
  setTextContent(content) {
    this.#node.textContent = content;
  }

  /**
   * Sets an attribute on the component's HTML node.
   * @param {string} attribute - The attribute to set.
   * @param {string} value - The value to set for the attribute.
   */
  setAttribute(attribute, value) {
    this.#node.setAttribute(attribute, value);
  }

  /**
   * Removes an attribute from the component's HTML node.
   * @param {string} attribute - The attribute to remove.
   */
  removeAttribute(attribute) {
    this.#node.removeAttribute(attribute);
  }

  /**
   * Toggles the presence of a CSS class on the component's HTML node.
   * @param {string} className - The class name to toggle.
   */
  toggleClass(className) {
    this.#node.classList.toggle(className);
  }

  /**
   * Adds an event listener to the component's HTML node.
   * @param {string} event - The event type to listen for.
   * @param {EventListener} listener - The callback function to be executed when the event occurs.
   * @param {boolean|AddEventListenerOptions} [options=false] - An options object specifying characteristics of the event listener.
   */
  addListener(event, listener, options = false) {
    this.#node.addEventListener(event, listener, options);
  }

  /**
   * Removes an event listener from the component's HTML node.
   * @param {string} event - The event type for which to remove the listener.
   * @param {EventListener} listener - The listener function to be removed.
   * @param {boolean|EventListenerOptions} [options=false] - Options that were used when adding the listener.
   */
  removeListener(event, listener, options = false) {
    this.#node.removeEventListener(event, listener, options);
  }

  /**
   * Destroys all child components associated with the current component.
   */
  destroyChildren() {
    this.#children.forEach((child) => {
      child.destroy();
    });
    this.#children.length = 0;
  }

  /**
   * Destroys the current component and removes its HTML node from the DOM.
   */
  destroy() {
    this.destroyChildren();
    this.#node.remove();
  }
}
class imageComponent extends Component {
  constructor({ className, src }) {
    super({ tag: "img", className });
    this.setAttribute("src", src);
  }
}
class Button extends Component {
  constructor({ className, text }) {
    super({ tag: "button", className, text });
    this.setAttribute("id", text);
  }
}
// headComponent
const headDark = new imageComponent({
  className: "head__darkmode",
  src: "img/darkmode.png",
});
const headDarkTimer = new Component(
  {
    tag: "div",
    className: "head__darktimer",
  },
  headDark,
  new Component({
    tag: "div",
    className: "head__timer",
    text: "0:00",
  }),
);
const head = new Component(
  {
    tag: "div",
    className: "head",
  },
  new Component({
    tag: "div",
    className: "head__title",
    text: "Nonograms",
  }),
  headDarkTimer,
);
// controlsComponent
class Option extends Component {
  constructor({ className, text }) {
    super({ tag: "option", className, text });
    this.setAttribute("id", text);
  }
}
class Select extends Component {
  constructor({ className, options }) {
    super({ tag: "select", className });

    options.forEach((optionText) => {
      const option = new Option({
        tag: "option",
        text: optionText,
        className: "app__diff-item",
      });
      this.append(option);
    });
  }
}
const difficultyTitle = new Component({
  tag: "div",
  className: "controls__title",
  text: "Choose the difficulty:",
});

const difficultySelect = new Select({
  className: "controls__diff-select",
  options: ["Easy", "Medium", "Hard"],
});

const schemeSelect = new Select({
  className: "controls__scheme-select",
  options: ["Scheme 1", "Scheme 2", "Scheme 3", "Scheme 4", "Scheme 5"],
});
const randomGameButton = new Button({
  className: "controls__diff-random-button",
  text: "Random game",
});
const controls = new Component(
  { className: "controls" },
  difficultyTitle,
  difficultySelect,
  schemeSelect,
  randomGameButton,
);
// game
const gameHints = new Component(
  {
    tag: "div",
    className: "game__hints",
  },
  new Component({
    tag: "div",
    className: "game__hints-column",
  }),
);
const gameGrid = new Component({
  tag: "div",
  className: "game__grid",
});
const gameGridWrapper = new Component(
  {
    tag: "div",
    className: "game__grid-wrapper",
  },
  new Component({
    tag: "div",
    className: "game__hints-row",
  }),
  gameGrid,
  new Component({
    className: "game__grid-overlay",
  }),
);
const game = new Component(
  {
    tag: "div",
    className: "game",
  },
  gameHints,
  gameGridWrapper,
);
// gameButtons
class Buttons extends Component {
  constructor({ className, buttons }) {
    super({ tag: "div", className });
    buttons.forEach((buttonText) => {
      const button = new Button({
        tag: "button",
        text: buttonText,
        className: "foot__button",
      });
      this.append(button);
    });
  }
}
const footComponent = new Buttons({
  className: "foot",
  buttons: ["Save game", "Continue Last Game", "Reset game", "Solution"],
});
// backgroundImg
const backgroundImage = new imageComponent({
  className: "background",
  src: "img/background-img.png",
});
// AppComponent
const feedback = new Component({
  className: "feedback",
});
const appComponent = new Component(
  {
    className: "app",
    tag: "section",
  },
  head,
  controls,
  game,
  feedback,
  footComponent,
);
document.body.append(appComponent.getNode());
document.body.append(backgroundImage.getNode());

// logic
const easySchemeCollection = {
  scheme1: [
    [false, true, false, true, false],
    [true, true, true, false, false],
    [false, true, true, false, false],
    [true, false, true, false, true],
    [false, false, true, false, false],
  ],
  scheme2: [
    [true, false, true, false, true],
    [false, true, false, true, false],
    [true, false, true, false, true],
    [false, true, false, true, false],
    [true, false, true, false, true],
  ],
  scheme3: [
    [false, false, true, false, false],
    [false, true, true, true, false],
    [true, true, false, true, true],
    [false, true, true, true, false],
    [false, false, true, false, false],
  ],
  scheme4: [
    [true, true, false, true, true],
    [true, false, false, false, true],
    [false, false, true, false, false],
    [true, false, false, false, true],
    [true, true, false, true, true],
  ],
  scheme5: [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, true, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
};
const mediumSchemeCollection = {
  scheme1: [
    [false, false, true, true, true, true, true, false, false, false],
    [false, true, false, false, false, false, false, true, false, false],
    [true, false, false, false, false, false, false, false, true, false],
    [true, false, false, false, true, true, false, false, true, false],
    [true, false, false, true, false, false, true, false, true, false],
    [true, false, false, true, false, false, true, false, true, false],
    [true, false, false, false, true, true, false, false, true, false],
    [true, false, false, false, false, false, false, false, true, false],
    [false, true, false, false, false, false, false, true, false, false],
    [false, false, true, true, true, true, true, false, false, false],
  ],
  scheme2: [
    [true, false, true, false, true, false, true, false, true, false],
    [false, true, false, true, false, true, false, true, false, true],
    [true, false, true, false, true, false, true, false, true, false],
    [false, true, false, true, false, true, false, true, false, true],
    [true, false, true, false, true, false, true, false, true, false],
    [false, true, false, true, false, true, false, true, false, true],
    [true, false, true, false, true, false, true, false, true, false],
    [false, true, false, true, false, true, false, true, false, true],
    [true, false, true, false, true, false, true, false, true, false],
    [false, true, false, true, false, true, false, true, false, true],
  ],
  scheme3: [
    [false, false, false, true, true, true, false, false, false, false],
    [false, false, true, true, true, true, true, false, false, false],
    [false, true, true, true, true, true, true, true, false, false],
    [true, true, true, false, false, false, true, true, true, false],
    [true, true, false, false, false, false, false, true, true, false],
    [true, true, false, false, false, false, false, true, true, false],
    [true, true, true, false, false, false, true, true, true, false],
    [false, true, true, true, true, true, true, true, false, false],
    [false, false, true, true, true, true, true, false, false, false],
    [false, false, false, true, true, true, false, false, false, false],
  ],
  scheme4: [
    [true, true, true, true, true, true, true, true, true, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, false, true, true, true, true, true, true, false, true],
    [true, false, true, false, false, false, false, true, false, true],
    [true, false, true, false, true, true, false, true, false, true],
    [true, false, true, false, true, true, false, true, false, true],
    [true, false, true, false, false, false, false, true, false, true],
    [true, false, true, true, true, true, true, true, false, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, true, true, true, true, true, true, true, true, true],
  ],
  scheme5: [
    [false, true, true, true, false, false, true, true, true, false],
    [true, false, false, false, true, true, false, false, false, true],
    [true, false, true, false, true, true, false, true, false, true],
    [true, false, false, false, true, true, false, false, false, true],
    [false, true, true, true, false, false, true, true, true, false],
    [false, true, true, true, false, false, true, true, true, false],
    [true, false, false, false, true, true, false, false, false, true],
    [true, false, true, false, true, true, false, true, false, true],
    [true, false, false, false, true, true, false, false, false, true],
    [false, true, true, true, false, false, true, true, true, false],
  ],
};

const hardSchemeCollection = {
  scheme1: [
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
    ],
    [
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
    ],
    [
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
    ],
    [
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      true,
      false,
    ],
    [
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
    ],
    [
      true,
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
    ],
    [
      true,
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
    ],
    [
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
    ],
    [
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      true,
      false,
    ],
    [
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
    ],
    [
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
    ],
    [
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  ],
  scheme2: [
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
  ],
  scheme3: [
    [
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
    ],
    [
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
    ],
    [
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      true,
    ],
    [
      true,
      true,
      false,
      true,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      true,
      false,
      true,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      true,
      false,
      true,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      true,
      false,
      true,
      true,
    ],
    [
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      true,
      false,
    ],
    [
      false,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  ],
  scheme4: [
    [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
    [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
    ],
    [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ],
    [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
  ],
  scheme5: [
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
  ],
};

let solutionGrid = [
  [false, true, false, true, false],
  [true, true, true, false, false],
  [false, true, true, false, false],
  [true, false, true, false, true],
  [false, false, true, false, false],
];
let currentLevel = "easy";
let currentChoosingScheme = easySchemeCollection;
let currentSchemeKey = "scheme1";
const selectDif = document.querySelector(".controls__diff-select");
const selectSch = document.querySelector(".controls__scheme-select");
const resetBtn = document.getElementById("Reset game");
const solutionBtn = document.getElementById("Solution");
solutionBtn.addEventListener("click", () => {
  showSolution();
  document.querySelector(".game__grid-overlay").classList.remove("hidden");
  setTimeout(() => {
    resetGame();
  }, 5000);
});
selectSch.addEventListener("change", function (event) {
  const selectScheme = event.target.value.replace(/\s+/g, "").toLowerCase();
  solutionGrid = currentChoosingScheme[selectScheme];
  currentSchemeKey = selectScheme;
  displayHint();
  resetGame();
});
selectDif.addEventListener("change", function (event) {
  const selectScheme = event.target.value.replace(/\s+/g, "").toLowerCase();
  if (selectScheme === "easy") {
    currentLevel = "easy";
    currentChoosingScheme = easySchemeCollection;
    solutionGrid = currentChoosingScheme["scheme1"];
    gridSize = 5;
    selectSch.value = "Scheme 1";
  } else if (selectScheme === "medium") {
    currentLevel = "medium";
    currentChoosingScheme = mediumSchemeCollection;
    solutionGrid = currentChoosingScheme["scheme1"];
    gridSize = 10;
    selectSch.value = "Scheme 1";
  } else if (selectScheme === "hard") {
    currentLevel = "hard";
    currentChoosingScheme = hardSchemeCollection;
    solutionGrid = currentChoosingScheme["scheme1"];
    gridSize = 15;
    selectSch.value = "Scheme 1";
  }
  displayHint();
  resetGame();
  createGrid();
});
resetBtn.addEventListener("click", function () {
  resetGame();
});
let gridSize = 5;
const gridContainer = document.querySelector(".game__grid");
function createGrid() {
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("grid__cell");
      cell.dataset.row = i;
      cell.dataset.col = j;

      if (i % 5 === 0) cell.style.borderTop = "3px solid white";
      if (j % 5 === 0) cell.style.borderLeft = "3px solid white";

      if (i === 0) cell.style.borderTop = "3px solid white";
      if (j === 0) cell.style.borderLeft = "3px solid white";

      if (i === gridSize - 1) cell.style.borderBottom = "3px solid white";
      if (j === gridSize - 1) cell.style.borderRight = "3px solid white";

      cell.addEventListener("click", (e) => {
        if (!gameStarted) {
          gameStarted = true;
          startTimer();
        }
        handleCellClick(e);
      });

      cell.addEventListener("contextmenu", (e) => {
        if (!gameStarted) {
          gameStarted = true;
          startTimer();
        }
        e.preventDefault();
        handleCellRightClick(e);
      });
      gridContainer.appendChild(cell);
    }
  }
}
function handleCellClick(e) {
  const blackAud = new Audio("sound/black.mp3");
  blackAud.play();
  const cell = e.target;
  cell.classList.toggle("filled");
  cell.classList.remove("crossed");
  checkWin();
}
function handleCellRightClick(e) {
  const redAud = new Audio("sound/red.mp3");
  redAud.play();
  const cell = e.target;
  cell.classList.toggle("crossed");
  cell.classList.remove("filled");
  checkWin();
}
const feedbackMessager = document.querySelector(".feedback");
function checkWin() {
  let isWin = true;
  document.querySelectorAll(".grid__cell").forEach((cell) => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const isFilled = cell.classList.contains("filled");
    if (solutionGrid[row][col] !== isFilled) {
      isWin = false;
    }
  });
  if (isWin) {
    const winAud = new Audio("sound/win.mp3");
    winAud.play();
    feedbackMessager.textContent = "Вы выиграли!";
    document.querySelector(".game__grid-overlay").classList.remove("hidden");
    resetTimer();
  }
}
createGrid();
function resetGame() {
  const gridCells = document.querySelectorAll(".grid__cell");
  gridCells.forEach((cell) => {
    cell.classList.remove("filled", "crossed");
  });
  resetTimer();
  resetFeedback();
  document.querySelector(".game__grid-overlay").classList.add("hidden");
}

function generateHints(grid) {
  const gridSize = grid.length;
  const rowHints = grid.map((row) => {
    const hints = [];
    let count = 0;
    row.forEach((cell) => {
      if (cell) {
        count++;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    });
    if (count > 0) hints.push(count);
    return hints.length ? hints : [0];
  });
  const colHints = [];
  for (let col = 0; col < gridSize; col++) {
    const hints = [];
    let count = 0;
    for (let row = 0; row < gridSize; row++) {
      if (grid[row][col]) {
        count++;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    }
    if (count > 0) hints.push(count);
    colHints.push(hints.length ? hints : [0]);
  }
  return { rowHints, colHints };
}
function displayHint() {
  const { rowHints, colHints } = generateHints(solutionGrid);
  const rowHintsContainer = document.querySelector(".game__hints-row");
  const colHintsContainer = document.querySelector(".game__hints-column");

  rowHintsContainer.innerHTML = "";
  colHintsContainer.innerHTML = "";

  rowHints.forEach((hint) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("hint-row");

    hint.forEach((num) => {
      const numDiv = document.createElement("div");
      numDiv.classList.add("hint-box");
      numDiv.textContent = num;
      rowDiv.appendChild(numDiv);
    });

    rowHintsContainer.appendChild(rowDiv);
  });

  colHints.forEach((hint) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("hint-column");

    hint.forEach((num) => {
      const numDiv = document.createElement("div");
      numDiv.classList.add("hint-box");
      numDiv.textContent = num;
      colDiv.appendChild(numDiv);
    });

    colHintsContainer.appendChild(colDiv);
  });
}
displayHint();
function showSolution() {
  document.querySelectorAll(".grid__cell").forEach((cell) => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    cell.classList.remove("filled", "crossed");
    if (solutionGrid[row][col]) {
      cell.classList.add("filled");
    }
  });
}
function formatTime(elapsedMilliseconds) {
  const totalSeconds = Math.floor(elapsedMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
function resetFeedback() {
  feedbackMessager.textContent = "";
}
let startTime;
let timerInterval;
let gameStarted = false;
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    document.querySelector(".head__timer").textContent = formatTime(elapsed);
  }, 100);
}
function saveTimer() {
  if (gameStarted) {
    const elapsed = Date.now() - startTime;
    localStorage.setItem("gameElapsed", elapsed.toString());
  } else {
    localStorage.setItem("gameElapsed", "0");
  }
}
function startTimerWithElapsed(savedElapsed) {
  startTime = Date.now() - savedElapsed;
  gameStarted = true;
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    document.querySelector(".head__timer").textContent = formatTime(elapsed);
  }, 100);
}
function loadTimer() {
  const savedElapsedStr = localStorage.getItem("gameElapsed");
  const savedElapsed = savedElapsedStr ? parseInt(savedElapsedStr, 10) : 0;
  if (savedElapsed > 0) {
    startTimerWithElapsed(savedElapsed);
  } else {
    resetTimer();
  }
}
function resetTimer() {
  clearInterval(timerInterval);
  document.querySelector(".head__timer").textContent = "0:00";
  gameStarted = false;
}
// random
const randomBtn = document.getElementById("Random game");

randomBtn.addEventListener("click", () => {
  const difficulties = ["easy", "hard", "medium"];
  const randomDiff =
    difficulties[Math.floor(Math.random() * difficulties.length)];
  currentLevel = randomDiff;
  if (randomDiff === "easy") {
    currentChoosingScheme = easySchemeCollection;
    gridSize = 5;
  } else if (randomDiff === "medium") {
    currentChoosingScheme = mediumSchemeCollection;
    gridSize = 10;
  } else if (randomDiff === "hard") {
    currentChoosingScheme = hardSchemeCollection;
    gridSize = 15;
  }
  const schemeKeys = Object.keys(currentChoosingScheme);
  const randomKey = schemeKeys[Math.floor(Math.random() * schemeKeys.length)];
  solutionGrid = currentChoosingScheme[randomKey];
  displayHint();
  createGrid();
  resetGame();
  const diffSelect = document.querySelector(".controls__diff-select");
  if (diffSelect) {
    diffSelect.value = randomDiff.charAt(0).toUpperCase() + randomDiff.slice(1);
  }
  const schemeSelect = document.querySelector(".controls__scheme-select");
  if (schemeSelect) {
    let arrRandomKey = randomKey.split("");
    let result = [[], []];
    arrRandomKey.forEach((key) => {
      if (Number(key)) {
        result[0].push(key);
      } else {
        result[1].push(key);
      }
    });
    let word = result[1].join("");
    let symbol = result[0].join("");
    let resultWord =
      word.charAt(0).toUpperCase() + word.slice(1) + ` ${symbol}`;
    schemeSelect.value = resultWord;
  }
});
// save button
const saveBtn = document.getElementById("Save game");

function saveGame() {
  let savedDiff = currentLevel;
  let savedScheme = currentChoosingScheme;
  let savedSchemeKey = currentSchemeKey;
  let savedGridSize = gridSize;
  const gridCells = document.querySelectorAll(".grid__cell");
  let gridData = [];
  for (let i = 0; i < gridSize; i++) {
    gridData.push(new Array(gridSize).fill(false));
  }
  gridCells.forEach((cell) => {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    if (cell.classList.contains("filled")) {
      gridData[row][col] = 1;
    } else if (cell.classList.contains("crossed")) {
      gridData[row][col] = 2;
    } else {
      gridData[row][col] = 0;
    }
  });
  localStorage.setItem("gameState", JSON.stringify(gridData));
  localStorage.setItem("gameDiff", JSON.stringify(savedDiff));
  localStorage.setItem("gameScheme", JSON.stringify(savedScheme));
  localStorage.setItem("gameSchemeKey", JSON.stringify(savedSchemeKey));
  localStorage.setItem("gameSize", JSON.stringify(savedGridSize));
}
saveBtn.addEventListener("click", () => {
  saveGame();
  saveTimer();
});
// loadGame
const loadBtn = document.getElementById("Continue Last Game");

function loadGame() {
  const savedGridData = localStorage.getItem("gameState");
  const savedDiff = localStorage.getItem("gameDiff");
  const savedScheme = localStorage.getItem("gameScheme");
  const savedSchemeKey = localStorage.getItem("gameSchemeKey");
  const savedSize = localStorage.getItem("gameSize");

  if (!savedGridData || !savedDiff || !savedSchemeKey || !savedSize) {
    console.log("Нет сохранённых данных");
    return;
  }

  const gridData = JSON.parse(savedGridData);
  const diff = JSON.parse(savedDiff);
  const scheme = JSON.parse(savedScheme);
  const size = JSON.parse(savedSize);
  const schemeKey = JSON.parse(savedSchemeKey);

  gridSize = size;

  if (diff === "easy") {
    currentLevel = "easy";
    currentChoosingScheme = easySchemeCollection;
  } else if (diff === "medium") {
    currentLevel = "medium";
    currentChoosingScheme = mediumSchemeCollection;
  } else if (diff === "hard") {
    currentLevel = "hard";
    currentChoosingScheme = hardSchemeCollection;
  }

  currentChoosingScheme = schemeKey;
  solutionGrid = scheme[schemeKey];

  resetGame();
  displayHint();
  createGrid();

  const gridCells = document.querySelectorAll(".grid__cell");
  gridCells.forEach((cell) => {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    cell.classList.remove("filled", "crossed");
    if (gridData[row] && gridData[row][col] === 1) {
      cell.classList.add("filled");
    } else if (gridData[row] && gridData[row][col] === 2) {
      cell.classList.add("crossed");
    }
  });

  const diffSelect1 = document.querySelector(".controls__diff-select");
  if (diffSelect1) {
    diffSelect1.value = diff.charAt(0).toUpperCase() + diff.slice(1);
  }
  const schemeSelect1 = document.querySelector(".controls__scheme-select");
  if (schemeSelect1) {
    let arrRandomKey = schemeKey.split("");
    let result1 = [[], []];
    arrRandomKey.forEach((key) => {
      if (Number(key)) {
        result1[0].push(key);
      } else {
        result1[1].push(key);
      }
    });
    let word = result1[1].join("");
    let symbol = result1[0].join("");
    let resultWord1 =
      word.charAt(0).toUpperCase() + word.slice(1) + ` ${symbol}`;
    schemeSelect1.value = resultWord1;
  }
  loadTimer();
}

loadBtn.addEventListener("click", () => {
  loadGame();
});
// dark mode
const darkBtn = document.querySelector(".head__darkmode");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
  document.querySelector(".game__grid-overlay").classList.add("hidden");
});
