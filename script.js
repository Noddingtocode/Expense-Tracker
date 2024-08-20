const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalExpensesElement = document.getElementById('total-expenses');
const categorySummary = document.getElementById('category-summary');

let expenses = [];
let totalExpenses = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (description && !isNaN(amount)) {
        const expense = { description, amount, category };
        expenses.push(expense);
        totalExpenses += amount;

        // Add expense to the list
        const li = document.createElement('li');
        li.textContent = `${description} - Rs ${amount.toFixed(2)} (${category})`;
        expenseList.appendChild(li);

        // Update summary
        updateSummary();
        
        // Clear form
        form.reset();
    }
});

function updateSummary() {
    totalExpensesElement.textContent = `Rs ${totalExpenses.toFixed(2)}`;

    // Calculate category breakdown
    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    categorySummary.innerHTML = '';
    for (const [category, amount] of Object.entries(categoryTotals)) {
        const li = document.createElement('li');
        li.textContent = `${category}: Rs ${amount.toFixed(2)}`;
        categorySummary.appendChild(li);
    }
}
