class Modal {
  constructor(element) {
    if (!element) {
      throw new Error('An empty element was passed');
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const closeButtons = this.element.querySelectorAll(
      '[data-dismiss="modal"]'
    );

    closeButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        this.onClose(event);
      });
    });
  }

  onClose(event) {
    event.preventDefault();
    this.close();
  }

  open() {
    this.element.style.display = 'block';
    this.element.querySelector('.form-group input').focus();
  }

  close() {
    this.element.style.display = 'none';
  }
}
