class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('An empty element was passed');
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    const elementData = {};

    Array.from(formData.entries()).forEach((item) => {
      const key = item[0];
      const value = item[1];

      elementData[key] = value;
    });

    return elementData;
  }

  onSubmit(options) {}

  submit() {
    this.onSubmit(this.getData());
  }
}
