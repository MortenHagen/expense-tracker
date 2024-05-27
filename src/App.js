import React, { useState } from 'react';

// ExpenseForm component
const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('housing');

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = { title, amount: parseFloat(amount), date, category };
    onAddExpense(expense);
    setTitle('');
    setAmount('');
    setDate('');
    setCategory('housing');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="housing">Housing</option>
          <option value="grocery">Grocery</option>
          <option value="transportation">Transportation</option>
          <option value="clothes">Clothes</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

// ExpenseItem component
const ExpenseItem = ({ expense, onDeleteExpense }) => {
  const handleDelete = () => {
    onDeleteExpense(expense.id);
  };

  return (
    <div>
      <h3>{expense.title}</h3>
      <p>Amount: ${expense.amount}</p>
      <p>Date: {expense.date}</p>
      <p>Category: {expense.category}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

// ExpenseList component
const ExpenseList = ({ expenses, onDeleteExpense }) => {
  return (
    <div>
      <h2>Expenses</h2>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDeleteExpense={onDeleteExpense}
        />
      ))}
    </div>
  );
};

// App component
const App = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    expense.id = Date.now();
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div>
      <h1>Expense Tracker App</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
    </div>
  );
};

export default App;
