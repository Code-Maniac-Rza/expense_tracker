import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseTracker = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState('');

    // Fetch expenses from the backend
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/expenses');
                setTransactions(response.data);
                const initialBalance = response.data.reduce(
                    (acc, transaction) => acc + transaction.amount, 
                    0
                );
                setBalance(initialBalance);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    // Add or update expense
    const handleExpense = async () => {
        const parsedAmount = parseFloat(amount);
    
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }
    
        if (!description || !category) {
            alert('Please fill in all fields.');
            return;
        }
    
        try {
            if (editMode) {
                // Find the existing transaction
                const oldTransaction = transactions.find((transaction) => transaction._id === editingId);
    
                // Update the backend
                await axios.put(`http://localhost:5000/expenses/${editingId}`, {
                    description,
                    amount: parsedAmount,
                    category,
                });
    
                // Update the transactions and balance in the frontend
                setTransactions((prevTransactions) =>
                    prevTransactions.map((transaction) =>
                        transaction._id === editingId ? {
                            ...transaction,
                            description,
                            amount: parsedAmount,
                            category,
                        } : transaction
                    )
                );
    
                // Adjust balance: subtract the old amount and add the new amount
                setBalance((prevBalance) => 
                    prevBalance - oldTransaction.amount + parsedAmount
                );
    
                setEditMode(false);
                setEditingId('');
            } else {
                const response = await axios.post('http://localhost:5000/expenses', {
                    description,
                    amount: parsedAmount,
                    category,
                });
    
                setTransactions((prevTransactions) => [
                    ...prevTransactions,
                    response.data,
                ]);
                setBalance((prevBalance) => prevBalance + parsedAmount);
            }
    
            setDescription('');
            setAmount('');
            setCategory('');
        } catch (error) {
            console.error('Error handling expense:', error);
        }
    };
    

    // Edit an expense
    const handleEdit = (id) => {
        const transaction = transactions.find((trans) => trans._id === id);
        setDescription(transaction.description);
        setAmount(transaction.amount);
        setCategory(transaction.category);
        setEditingId(id);
        setEditMode(true);
    };

    // Delete an expense
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/expenses/${id}`);
            setTransactions((prevTransactions) =>
                prevTransactions.filter((transaction) => transaction._id !== id)
            );
            setBalance((prevBalance) => 
                prevBalance - transactions.find((trans) => trans._id === id).amount
            );
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <div className="container">
            <h1>Expense Tracker</h1>
            <div className="balance">
                <h2>
                    Balance: ₹
                    <span id="balance">
                        {balance.toFixed(2)}
                    </span>
                </h2>
            </div>
            <div className="transactions">
                <h2>Transactions</h2>
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction._id}>
                            {`${transaction.description} (${transaction.category}): ₹${transaction.amount.toFixed(2)}`}
                            <div className="transaction-buttons">
                                <button
                                    className="edit"
                                    onClick={() => handleEdit(transaction._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete"
                                    onClick={() => handleDelete(transaction._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="add-expense">
                <h2>{editMode ? 'Edit Expense' : 'Add Expense'}</h2>
                <form>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Health">Health</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                    <button
                        type="button"
                        onClick={handleExpense}
                    >
                        {editMode ? 'Update Expense' : 'Add Expense'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ExpenseTracker;
