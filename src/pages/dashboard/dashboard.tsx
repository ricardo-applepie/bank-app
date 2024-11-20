import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Badge, Button, Card, CardActionArea, CardContent, Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import MailIcon from '@mui/icons-material/Mail';

function Dashboard() {
  const [account, setAccount] = useState<any>({});
  const [amount, setAmount] = useState<any>(0);

  const [selectedRecieverId, setSelectedRecieverId] = useState("");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }

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
        console.log(data); // Handle the data received from the API
        setAccount(data);
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });

  }, []);


  const notificationLength = account.notifications?.length;
  const {users} = account;

  return (
      <Container maxWidth="sm">
        <div className="">
           <div className='flex'>
              <Badge color="secondary" badgeContent={notificationLength}>
                <MailIcon />
              </Badge>
              <Button variant="contained" onClick={() => logout()}>Logout</Button>
           </div>
          <h1>My account</h1>

          <Card variant="outlined">
            <CardActionArea>
              <CardContent>

                <h2>{account?.firstName} {account.lastName}</h2>
                <h3>{account.email}</h3>
                <p> Balance:  <span>{account.balance}</span> € </p> 
              </CardContent>   
            </CardActionArea>  
          </Card>

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
  );
}

export default Dashboard;
