import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { Button, Card, CardActionArea, CardContent, Container, TextField } from '@mui/material';


interface Transaction {
  id: number;
  amount: string;
  type: 'debit' | 'credit'; // You can expand this if there are more types in the future
  createdAt: string; // You can also use Date type if you'd prefer working with Date objects
  updatedAt: string; // Same as createdAt, can be Date type as well
  receiverId: string;
  senderId: string;
  sender: {
    firstName: string;
    lastName: string;
  }
  receiver: {
    firstName: string;
    lastName: string;
  }
}

function Dashboard() {
  const [account, setAccount] = useState<any>({});
  const [amount, setAmount] = useState<any>(0);

  const [selectedRecieverId, setSelectedRecieverId] = useState("");



  const handleSend = () => {
   const url = 'https://bank-backend-nh15.onrender.com/create'; // Replace with your URL
   const token = localStorage.getItem('token'); // Use your custom token name

    const options = {
        method: 'POST', // or 'POST', depending on your API
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify({
          amount, 
          type: 'debit', 
          senderId: account.userId, 
          receiverId: selectedRecieverId,
        }) // Convert the data to a JSON string
    };
    fetch(url, options)
    .then((res) => {
        if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json(); // Convert response to JSON
    })
    .then((data) => {
        console.log(data); // Handle the data received from the API
        setAccount(data);
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
  }


  useEffect(() => {
   const url = 'https://bank-backend-nh15.onrender.com/account'; // Replace with your URL
   const token = localStorage.getItem('token'); // Use your custom token name

    const options = {
        method: 'GET', // or 'POST', depending on your API
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}` // Include the token in the Authorization header
        },
    };
    fetch(url, options)
    .then((res) => {
        if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json(); // Convert response to JSON
    })
    .then((data) => {
        setAccount(data);
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });

  }, []);


  const { users, transactions, userId } = account;

  return (
    <div className="dashboard">
      <Container maxWidth="sm">
        <div className="mt-2">
          <h2>My account</h2>

          <Card variant="outlined" className="dashboard-account">
            <CardActionArea>
              <CardContent>
                <h2 className="dark-text">{account?.firstName} {account.lastName}</h2>
                <h2 className="dark-text">{account.email}</h2>
                <p className="dark-text"> Account Balance: <span>{account.balance}</span> € </p> 
              </CardContent>   
            </CardActionArea>  
          </Card>
          <div className="my-2">
            <h3>Transactions</h3>
            <ul className="list-group">
              {transactions && transactions.map((transaction: Transaction) => {
                const { firstName, lastName } = transaction.sender;
                if(transaction.receiverId === userId) {
                  return (
                  <li className="list-group-item d-flex justify-content-between py-4 px-4">
                    <div><span>{firstName}</span> <span>{lastName}</span></div>
                    <div><span className="reciver-amount">{transaction.amount} €</span></div>
                  </li>
                  )
                } else {
                  return (
                    <li className="list-group-item d-flex justify-content-between py-4 px-4">
                      <div><span>{firstName}</span> <span>{lastName}</span></div>
                      <div><span >- {transaction.amount} €</span></div>
                    </li>                        
                  )
                }
              })}
            </ul>
          </div>

          <Card variant="outlined" className='send'>
            <CardActionArea>
              <CardContent>
                <h1>Users:-</h1>
                <div>
                  {users?.map((user: any) => (
                      <ul>
                      <li 
                        onClick={() => setSelectedRecieverId(user.userId)}
                      > 
                      <span>{user.firstName}</span> <span>{user.lastName}</span> <span>{user.userId === selectedRecieverId && "_/"}</span>
                      </li>
                      </ul>
                  ))}
                  {selectedRecieverId && (
                  <div className='flex'>  
                      <TextField
                      id="amount"
                      label="amount"
                      type="number"
                      autoComplete="current-password"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
                      />
                      <Button variant="contained" onClick={() => handleSend()}>send</Button>
                  </div>
                  )}
                </div>
              </CardContent>   
            </CardActionArea>  
          </Card>
   
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
