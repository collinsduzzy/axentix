/**
 * Class Dropdown
 * @class
 */
class Dropdown {
  /**
   * Construct Dropdown instance
   * @constructor
   * @param {String} element
   * @param {Object} options
   */
  constructor(element, options) {
    this.defaultOptions = {
      animationDelay: 300,
      animationType: 'none',
      hover: false
    };

    this.el = document.querySelector(element);
    this.el.Dropdown = this;
    this.dropdownContent = document.querySelector('#' + this.el.id + ' .dropdown-content');
    this.dropdownTrigger = document.querySelector('#' + this.el.id + ' .dropdown-trigger');
    this.isAnimated = false;
    this.isActive = this.el.classList.contains('active') ? true : false;

    this.options = Axentix.extend(this.defaultOptions, options);
    this._setup();
  }

  /**
   * Setup listeners
   */
  _setup() {
    if (this.options.hover) {
      this.el.classList.add('active-hover');
    } else {
      this.listenerRef = this._onClickTrigger.bind(this);
      this.dropdownTrigger.addEventListener('click', this.listenerRef);

      this.documentClickRef = this._onDocumentClick.bind(this);
      document.addEventListener('click', this.documentClickRef, true);
    }

    this._setupAnimation();
  }

  /**
   * Check and init animation
   */
  _setupAnimation() {
    const animationList = ['none', 'fade'];
    this.options.animationType = this.options.animationType.toLowerCase();
    animationList.includes(this.options.animationType) ? '' : (this.options.animationType = 'none');

    if (this.options.animationType !== 'none' && !this.options.hover) {
      if (this.options.hover) {
        this.el.style.animationDuration = this.options.animationDelay + 'ms';
      } else {
        this.el.style.transitionDuration = this.options.animationDelay + 'ms';
      }
      this.el.classList.add('anim-' + this.options.animationType);
    }
  }

  /**
   * Handle click on document click
   */
  _onDocumentClick(e) {
    if (e.target.matches('.dropdown-trigger')) {
      return;
    }

    if (this.isAnimated || !this.isActive) {
      return;
    }

    this.close();
  }

  /**
   * Handle click on trigger
   */
  _onClickTrigger(e) {
    e.preventDefault();

    if (this.isAnimated) {
      return;
    }

    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open dropdown
   */
  open() {
    if (this.isActive) {
      return;
    }
    this.dropdownContent.style.display = 'flex';
    setTimeout(() => {
      this.el.classList.add('active');
      this.isActive = true;
    }, 10);

    if (this.options.animationType !== 'none') {
      this.isAnimated = true;
      setTimeout(() => {
        this.isAnimated = false;
      }, this.options.animationDelay);
    }
  }

  /**
   * Close dropdown
   */
  close() {
    if (!this.isActive) {
      return;
    }
    this.el.classList.remove('active');

    if (this.options.animationType !== 'none') {
      this.isAnimated = true;
      setTimeout(() => {
        this.dropdownContent.style.display = '';
        this.isAnimated = false;
        this.isActive = false;
      }, this.options.animationDelay);
    } else {
      this.dropdownContent.style.display = '';
      this.isAnimated = false;
      this.isActive = false;
    }
  }
}
