let expenseArray = [];

class Expense {
  constructor(amount, storeName, date, description) {
    this.amount = amount;
    this.storeName = storeName;
    this.date = date;
    this.description = description;
  }
}

document.querySelector("#submit-button").addEventListener("click", (e) => {
  e.preventDefault();

  const amount = document.querySelector("#amount");
  const storeName = document.querySelector("#store-name");
  const date = document.querySelector("#date");
  const description = document.querySelector("#description");

  if (amount.value === null || amount.value === '') {
    alert("Please enter an amount");
    return false;
  }

  const expense = new Expense(
    parseFloat(amount.value),
    storeName.value,
    date.value,
    description.value
  );

  expenseArray.push(expense);
  createExpenseRow(expense);
  const form = document.querySelector("#input");
  form.reset();
});

function createExpenseRow(expense) {
  const newRow = document.createElement("tr");

  const newExpenseAmount = document.createElement("td");
  newExpenseAmount.textContent = `$${expense.amount}`;

  const newExpenseStoreName = document.createElement("td");
  newExpenseStoreName.textContent = expense.storeName;

  const newExpenseDate = document.createElement("td");
  newExpenseDate.textContent = expense.date;

  const newExpenseDescription = document.createElement("td");
  newExpenseDescription.textContent = expense.description;

  const newDeleteButton = createNewDeleteButton();

  newRow.append(
    newExpenseAmount,
    newExpenseStoreName,
    newExpenseDate,
    newExpenseDescription,
    newDeleteButton
  );

  const expenseRow = document.querySelector("#expense");
  expenseRow.append(newRow);
}

function createNewDeleteButton() {
  const newDeleteButton = document.createElement("td");
  newDeleteButton.classList.add('delete-button-cell');
  const deleteButton = document.createElement("button");
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener("click", () => deleteRow(deleteButton));
  deleteButton.textContent = "X";
  newDeleteButton.append(deleteButton);
  return newDeleteButton;
}

function deleteRow(deleteButton) {
  deleteButton.parentElement.parentElement.remove();
}



