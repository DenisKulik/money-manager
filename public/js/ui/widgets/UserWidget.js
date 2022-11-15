class UserWidget {
  constructor(element) {
    if (!element) {
      throw new Error('An empty element was passed');
    }

    this.element = element;
  }

  update() {
    const currentUser = User.current();

    if (!currentUser) return;

    const userName = this.element.querySelector('.user-name');
    userName.textContent = currentUser.name;
  }
}
