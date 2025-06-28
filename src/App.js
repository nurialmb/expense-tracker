import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './ExpenseForm';

function App() {
  // Load expenses from localStorage or default to an empty array
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const totalExpense = expenses.reduce((total, expense) => {
    // Convert to number and handle USD or KZT (can add conversion later if needed)
    return total + parseFloat(expense.amount);
  }, 0);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <span>
              {expense.title} - {expense.amount} {expense.currency} - {expense.category} - {expense.date}
            </span>
            <button onClick={() => deleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Total Expense: {totalExpense} USD</h2>
    </div>
  );
}

export default App;
