class TransactionsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Invalid value');
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element
      .querySelector('.create-income-button')
      .addEventListener('click', (event) => {
        event.preventDefault();
        App.getModal('newIncome').open();
      });

    this.element
      .querySelector('.create-expense-button')
      .addEventListener('click', (event) => {
        event.preventDefault();
        App.getModal('newExpense').open();
      });
  }
}
