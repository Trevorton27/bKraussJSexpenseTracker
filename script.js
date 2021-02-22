const expenseArray = JSON.parse(localStorage.getItem('expenseArray')) || [];

document.querySelector('#submit-button').addEventListener('click', (e) => {
  e.preventDefault();

  const amount = document.querySelector('#amount');
  const storeName = document.querySelector('#store-name');
  const date = document.querySelector('#date');
  const description = document.querySelector('#description');

  if (amount.value === null || amount.value === '') {
    alert('Please enter an amount');
    return false;
  }

  const expense = {
    id: Math.random(),
    amount: parseFloat(amount.value),
    storeName: storeName.value,
    date: date.value,
    description: description.value
  };

  expenseArray.push(expense);
  createExpenseRow(expense);
  pushToLocalStorage(expense);

  const form = document.querySelector('#form');
  form.reset();
  console.log('expenseArray ', expenseArray);
});

function pushToLocalStorage(expense) {
  localStorage.setItem('expenseArray', JSON.stringify(expenseArray));
}

function createExpenseRow(expense) {
  const newRow = document.createElement('tr');

  const newExpenseAmount = document.createElement('td');
  newExpenseAmount.textContent = `$${expense.amount}`;

  const newExpenseStoreName = document.createElement('td');
  newExpenseStoreName.textContent = expense.storeName;

  const newExpenseDate = document.createElement('td');
  newExpenseDate.textContent = expense.date;

  const newExpenseDescription = document.createElement('td');
  newExpenseDescription.textContent = expense.description;

  const newDeleteButton = document.createElement('td');
  newDeleteButton.classList.add('delete-button-cell');
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', () =>
    deleteRow(deleteButton, expense.id)
  );
  deleteButton.textContent = 'X';
  newDeleteButton.append(deleteButton);

  newRow.append(
    newExpenseAmount,
    newExpenseStoreName,
    newExpenseDate,
    newExpenseDescription,
    newDeleteButton
  );

  const expenseRow = document.querySelector('#expense');
  expenseRow.append(newRow);
}

function createNewDeleteButton() {}

function deleteRow(deleteButton, id) {
  deleteButton.parentElement.parentElement.remove();
  for (let i = 0; i < expenseArray.length; i++) {
    if (expenseArray[i].id === id) {
      expenseArray.splice(i, 1);
      localStorage.setItem('expenseArray', JSON.stringify(expenseArray));
    }
  }
}

window.addEventListener('load', (e) => {
  e.preventDefault();
  expenseArray.forEach((expense) => {
    createExpenseRow(expense);
  });
});
