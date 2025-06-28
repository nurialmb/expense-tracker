import React, { useState, useEffect } from 'react';
import { Container, Grid, List, ListItem, ListItemText, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ExpenseForm from './ExpenseForm';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [searchTerm, setSearchTerm] = useState(''); // State for the search bar
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // Filter expenses by title and category
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearchTerm = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? expense.category === categoryFilter : true;
    return matchesSearchTerm && matchesCategory;
  });

  const totalExpense = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Expense Tracker</h1>
          <ExpenseForm onAddExpense={addExpense} />
        </Grid>

        {/* Search Bar */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by Title"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>

        {/* Category Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <h2>Total Expense: {totalExpense} {filteredExpenses.length > 0 ? filteredExpenses[0].currency : 'USD'}</h2>
        </Grid>

        {/* Expense List */}
        <Grid item xs={12}>
          <List>
            {filteredExpenses.map((expense, index) => (
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
