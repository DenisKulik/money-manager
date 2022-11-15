class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    if (!User.current()) {
      return;
    }

    const select = this.element.querySelector('select');

    Account.list(User.current(), (err, response) => {
      if (response.success) {
        select.innerHTML = '';

        response.data.forEach((item) => {
          select.options.add(this.createOption(item));
        });
      } else {
        alert(JSON.stringify(response.error));
      }
    });
  }

  createOption(elem) {
    const option = document.createElement('option');
    option.textContent = elem.name;
    option.value = elem.id;

    return option;
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      } else {
        alert(JSON.stringify(response.error));
      }
    });
  }
}
