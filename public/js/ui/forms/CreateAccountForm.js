class CreateAccountForm extends AsyncForm {
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response.success) {
        App.update();
        App.getModal('createAccount').close();
        this.element.reset();
      } else {
        alert(JSON.stringify(response.error));
      }
    });
  }
}
