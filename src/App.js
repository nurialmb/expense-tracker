import React, { useState, useEffect } from 'react';
import { Container, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import ExpenseForm from './ExpenseForm';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

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
  return total + parseFloat(expense.amount);
  }, 0);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Expense Tracker</h1>
          <ExpenseForm onAddExpense={addExpense} />
        </Grid>
        <Grid item xs={12}>
          <h2 className="text-center mt-4">Total Expense: {totalExpense} {expenses.length > 0 ? expenses[0].currency : 'USD'}</h2>
        </Grid>
        <Grid item xs={12}>
          <List>
            {expenses.map((expense, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${expense.title} - ${expense.amount} ${expense.currency} - ${expense.category} - ${expense.date}`}
                />
                <Button variant="outlined" color="secondary" onClick={() => deleteExpense(index)} style={{ marginLeft: '10px' }}>
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
