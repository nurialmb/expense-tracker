import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';

function App() {
  const [expenses, setExpenses] = useState([]);
  
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <span>{expense.title} - ${expense.amount} - {expense.category}</span>
            <button onClick={() => deleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Total Expense: ${totalExpense}</h2>
    </div>
  );
}

export default App;
