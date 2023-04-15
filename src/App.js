import React, { useState, useEffect } from 'react';
import './App.css';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { v4 as uuidv4 } from 'uuid';

// localStorage.getItem('item name');
// localStorage.setItem('item name');

// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car payment", amount: 400 },
//   { id: uuidv4(), charge: "credit card bill", amount: 1200 }
// ];

// const localStorageExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];


function App() {
  // **** state value *****
  // * all expenses, add expense
  const [expenses, setExpenses] = useState([]);
  // * single expense
  const [charge, setCharge] = useState("");
  // * single amount
  const [amount, setAmount] = useState("");
  // ***alert
  const [alert, setAlert] = useState({ show: false })
  // *** edit
  const [edit, setEdit] = useState(false);
  // *** edit item
  const [id, setId] = useState(0);
  // ****** useEffect *****
  // useEffect(()=>{
    // console.log("we called useEffect")
  //   localStorage.setItem('expenses', JSON.stringify(expenses));
  // }, [expenses]);

  // ****** functionality *****

  // **** handle charge
  const handleCharge = e => {
    console.log(`charge : ${e.target.value}`);
    setCharge(e.target.value)
  };

  // **** handle amount
  const handleAmount = e => {
    console.log(`amount : ${e.target.value}`);
    setAmount(e.target.value)
  };
  // **** handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  }

  // **** handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpense = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpense);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      //* handle alert called
      handleAlert({ type: 'danger', text: `charge can't be empty value and amount value has to be bigger than zero` })
    }
  };

  // **** clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: "all items deleted" });
  };
  // ** handle delete
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: 'danger', text: "item deleted" });
  };
  // ** handle edit
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  // console.log(expenses);
  // const expenses = result[0];
  // const setExpenses = result[1];
  // console.log(expenses, setExpenses);

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>Total Sepending : <span className='"total'>
      $ {expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}
      </span>
      </h1>
    </>
  );
}

export default App;
