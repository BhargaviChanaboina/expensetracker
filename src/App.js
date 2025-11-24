import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([
    { id: date.now(), name: 'Food' },
    { id: date.now(), name: 'Electricity' },
    { id: date.now(), name: 'Shopping' },
    { id: date.now(), name: 'Vacation' },
    { id: date.now(), name: 'Loans' }
  ]);

  const addExpense = () => {
    if (!amount || !description || !description.trim() || !category || !category.trim()) { alert('All fields are required'); return }

    const newExpense = {
      id: Date.now(),
      category,
      description,
      amount,
      date: new Date()
    }

    setExpenses([...expenses, newExpense]);
    setCategory('');
    setAmount(0);
    setDescription('');
    console.log('New expense added');
  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((ex) => ex.id !== id)
    setExpenses(updatedExpenses)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Tracker</h1>
      </header>
      <center>
        <div style = {{ maxHeight:'400px', maxWidth:'500px',  backgroundColor:'lightgrey', marginTop: '30px', borderRadius: '8px'}}>
          <label><b>Category:</b></label>&nbsp;&nbsp;&nbsp;
          <select onChange={(e) => setCategory(e.target.value)} value={category}
            style={{marginTop: '10px', height: '30px', borderRadius: '4px'}}>
            <option>Food</option>
            <option>Electricity</option>
            <option>Shopping</option>
            <option>Vacation</option>
            <option>Loans</option>
          </select>
          {/* <input type = 'textarea' onChange={(e) => setCategory(e.target.value)} value = {category} style={{marginTop: '10px', height: '30px', borderRadius: '4px'}}></input><br/> */}
          <label><b>Amount:</b></label>&nbsp;&nbsp;&nbsp;
          <input type = 'number'  onChange={(e) => setAmount(e.target.value)} value ={amount} style={{marginTop: '10px', height: '30px', borderRadius: '4px'}}></input><br/>
          <label><b>Description:</b></label>&nbsp;&nbsp;&nbsp;
          <input type = 'textarea'  onChange={(e)=>setDescription(e.target.value)} value ={description} style={{marginTop: '10px', height: '30px', borderRadius: '4px', width: '250px'}}></input><br/><br/>
          <button style={{height: '40px', backgroundColor: 'lightgreen', borderRadius: '5px', cursor: "pointer", marginBottom: '10px'}} onClick={addExpense} >Add Expense</button>
        </div>
      </center>
      <div>
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
            {expenses.map((expense, index) => (
              <tr key={index}>
                  <td>{expense.category}</td>
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
