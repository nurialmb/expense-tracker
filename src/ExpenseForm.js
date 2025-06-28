import React, { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Container, Grid } from '@mui/material';

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date || amount <= 0) {
      alert('Please fill out all fields correctly!');
      return;
    }
    onAddExpense({ title, amount, category, date, currency });
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setCurrency('USD');
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Amount"
            variant="outlined"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            variant="outlined"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              label="Currency"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="KZT">KZT</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Add Expense
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ExpenseForm;
