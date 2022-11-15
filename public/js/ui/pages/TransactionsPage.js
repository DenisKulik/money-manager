class TransactionsPage {
  constructor(element) {
    if (!element) {
      throw new Error('Invalid value');
    }

    this.element = element;
    this.registerEvents();
  }

  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.closest('.remove-account')) {
        this.removeAccount();
      } else if (event.target.closest('.transaction__remove')) {
        this.removeTransaction(
          event.target.closest('.transaction__remove').dataset.id
        );
      }
    });
  }

  removeAccount() {
    if (!this.lastOptions) {
      return;
    }

    if (confirm('Вы действительно хотите удалить счёт?')) {
      Account.remove(
        { id: this.lastOptions.account_id },
        (err, response) => {
          if (response.success) {
            App.update();
          }
        }
      );

      this.clear();
    }
  }

  removeTransaction(id) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove({ id }, (err, response) => {
        if (response && response.success) {
          App.update();
        }
      });
    }
  }

  render(options) {
    if (!options) {
      return;
    }
    this.lastOptions = options;

    Account.get(options.account_id, (err, response) => {
      if (response.success) {
        this.renderTitle(response.data.name);
      }
    });

    Transaction.list(options, (err, response) => {
      if (response.success) {
        this.renderTransactions(response.data);
      }
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  renderTitle(name) {
    const contentTitle = document.querySelector('.content-title');
    contentTitle.textContent = name;
  }

  formatDate(date) {
    const currentDate = new Date(date);

    const day = currentDate.toLocaleString('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const time = currentDate.toLocaleString('ru', {
      hour: 'numeric',
      minute: 'numeric',
    });

    return `${day} в ${time}`;
  }

  getTransactionHTML(item) {
    const id = item.id;
    const type = item.type;
    const name = item.name;
    const sum = item.sum;
    const date = this.formatDate(item.created_at);

    const transactionHTML = `<div class="transaction transaction_${type.toLowerCase()} row">
			<div class="col-md-7 transaction__details">
				<div class="transaction__icon">
					<span class="fa fa-money fa-2x"></span>
			</div>
			<div class="transaction__info">
				<h4 class="transaction__title">${name}</h4>
				<div class="transaction__date">${date}</div>
			</div>
			</div>
			<div class="col-md-3">
				<div class="transaction__summ">
					${sum} <span class="currency">₽</span>
				</div>
			</div>
			<div class="col-md-2 transaction__controls">
				<button class="btn btn-danger transaction__remove" data-id=${id}>
					<i class="fa fa-trash"></i>  
				</button>
			</div>
		</div>`;

    return transactionHTML;
  }

  renderTransactions(data) {
    const content = this.element.querySelector('.content');

    content.innerHTML = '';

    data.forEach((item) => {
      content.innerHTML += this.getTransactionHTML(item);
    });
  }
}
