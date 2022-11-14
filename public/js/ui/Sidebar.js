class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const sidebarMini = document.querySelector('.sidebar-mini');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    sidebarToggle.addEventListener('click', (e) => {
      e.preventDefault();

      sidebarMini.classList.toggle('sidebar-open');
      sidebarMini.classList.toggle('sidebar-collapse');
    });
  }

  static initAuthLinks() {
    const sidebarMenu = document.querySelector('.sidebar-menu');

    sidebarMenu.addEventListener('click', (event) => {
      if (event.target.closest('.menu-item_login')) {
        App.getModal('login').open();
      }

      if (event.target.closest('.menu-item_register')) {
        App.getModal('register').open();
      }

      if (event.target.closest('.menu-item_logout')) {
        User.logout((err, response) => {
          if (response && response.success) {
            App.setState('init');
            User.unsetCurrent();
          }
        });
      }
    });
  }
}
