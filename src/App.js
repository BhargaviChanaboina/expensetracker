import './App.css';
import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import ExpenseChart from './charts';


function App() {

    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);

    const [categoryOptions, setCategoryOptions] = useState([
      { value: 'Food', label: 'Food' },
      { value: 'Electricity', label: 'Electricity' },
      { value: 'Shopping', label: 'Shopping' },
      { value: 'Vacation', label: 'Vacation' },
      { value: 'Loans', label: 'Loans' }
    ]);

    const [expenseByCategories, setExpenseByCategories] = useState({});

    useEffect(() => {
        const expenseMap = {}
        expenses.forEach((expense) => {
          const ctg = expense.category.value;
            if (!expenseMap[ctg]) {
                expenseMap[ctg] = expense.amount;
            } else expenseMap[ctg] = expenseMap[ctg] + expense.amount;
        });
        setExpenseByCategories(expenseMap)
    }, [expenses])

  const addExpense = () => {
    if (!amount || !description || !description.trim() || !category || !category.value || !category.value.trim()) { alert('All fields are required'); return }

    const newExpense = {
      id: Date.now(),
      category,
      description,
      amount,
      date: new Date()
    }

    setExpenses([...expenses, newExpense]);
    setCategory('');
    setAmount('');
    setDescription('');
  }

  const deleteExpense = (id) => {
      const updatedExpenses = expenses.filter((ex) => ex.id !== id)
      setExpenses(updatedExpenses)
  }

  const handleChange = (selected) => {
      setCategory(selected)
  }
  const handleCreate = (inputValue) => {
      if (!inputValue || !inputValue.trim()) return;
      const cleaned = inputValue.trim();
      const existing = categoryOptions.find((op) => op.value.toLocaleLowerCase() === cleaned.toLowerCase())
      if (existing) setCategory(existing);
      const newOption = { value: cleaned.toLowerCase(), label: cleaned };

      setCategoryOptions([...categoryOptions, newOption]);
      setCategory(newOption);
  }

    
      const formatCreateLabel = (inputValue) => `➕ Add "${inputValue}"`;
  

  return (
    <div className="App">
        <header className="App-header">
            <h1>Expense Tracker</h1>
        </header>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style = {{ maxHeight:'400px', maxWidth:'500px',  backgroundColor:'lightgrey', marginTop: '30px', borderRadius: '8px', justifyContent: 'center', padding: '15px'}}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: '15px' }}>
                <label ><b>Category:</b></label>
                <div style={{width: '320px', marginTop: '10px'}}>
                  <CreatableSelect
                  isClearable
                  onChange={handleChange}
                  onCreateOption={handleCreate}
                  options={categoryOptions}
                  value={category}
                  formatCreateLabel={formatCreateLabel}
                  createOptionPosition='first'
                  />
                </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <label style={{marginLeft: '15px', justifyContent: 'left'}}><b>Amount:</b></label>&nbsp;&nbsp;&nbsp;
                    <input type = 'number'  onChange={(e) => setAmount(parseFloat(e.target.value))} value ={amount} style={{marginTop: '10px', marginLeft: '9px', height: '30px', borderRadius: '4px'}}></input><br/>
                    <span style={{marginLeft: '5px'}}>INR</span>
                </div>
                <label style={{marginLeft: '15px', justifyContent: 'left'}}><b>Description:</b></label>&nbsp;&nbsp;&nbsp;
                <input type = 'textarea'  onChange={(e)=>setDescription(e.target.value)} value ={description} style={{marginTop: '10px', height: '30px', borderRadius: '4px', width: '250px'}}></input><br/><br/>
                <button style={{height: '40px', backgroundColor: 'lightgreen', borderRadius: '5px', cursor: "pointer", marginBottom: '10px'}} onClick={addExpense} >Add Expense</button>
            </div>
        </div>
        <ExpenseChart expensesMap={expenseByCategories} expensesList={expenses}/>
        <div>
           {expenses && expenses.length && <h2 style={{marginTop: '30px', textAlign: 'center'}}>All Expenses</h2>}
            {expenses && expenses.length && <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                    <td>{expense.category.value}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.description}</td>
                    <td><button onClick={() => deleteExpense(expense.id)}>Delete Expense</button></td>
                </tr>
              ))}
              </tbody>
            </table>} 
            { (!expenses || !expenses.length) && <h3>No Expenses Found</h3> }
          
        </div>
    </div>
  );
}

export default App;
