class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Invalid value');
    }

    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const accountsPanel = document.querySelector('.accounts-panel');

    accountsPanel.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.closest('.create-account')) {
        App.getModal('createAccount').open();
      }

      if (event.target.closest('.account')) {
        this.onSelectAccount(event.target.closest('.account'));
      }
    });
  }

  update() {
    if (!User.current()) {
      return;
    }

    Account.list(User.current(), (err, response) => {
      if (response.success) {
        this.clear();

        this.renderItem(response.data);
      }
    });
  }

  clear() {
    const accList = this.element.querySelectorAll('.account');
    accList.forEach((acc) => acc.remove());
  }

  onSelectAccount(element) {
    this.element.querySelectorAll('.active').forEach((account) => {
      account.classList.remove('active');
    });
    element.classList.add('active');
    App.showPage('transactions', { account_id: element.dataset.id });
  }

  getAccountHTML(item) {
    return `<li class="account" data-id="${item.id}">
        <a href="#">
            <span>${item.name}</span>
            <span>${item.sum} ₽</span>
        </a>
      </li>`;
  }

  renderItem(data) {
    const accountListArr = document.querySelector('.accounts-panel');
    data.forEach((item) =>
      accountListArr.insertAdjacentHTML(
        'beforeend',
        this.getAccountHTML(item)
      )
    );
  }
}
