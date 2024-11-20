import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './register.css';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router';

export default function Register() {
  const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", phone: "", password: ""});
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     console.log(formData)
     const value = event.target.value;
     const id = event.target.id;
     setFormData({...formData,[id]: value });

  };

  const handleClick = () => {
    const formKeys = Object.keys(formData);
    const isValid = formKeys.every((value) => value.length > 0);
    if(!isValid) return;
    const url = 'http://localhost:4000/user'; // Replace with your URL

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify that you're sending JSON data
      },
      body: JSON.stringify(formData) // Convert the data to a JSON string
    };
    
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        navigate('/login')
      })
      .catch(error => console.error('Error:', error));
      }

  return (
      <Container maxWidth="sm">
      <div className='form'>

        <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
            <TextField
              id="firstName"
              label="First Name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
            />

            <TextField
              id="lastName"
              label="Last Name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
            />
            <TextField
              id="username"
              label="username"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
            />
            <TextField
              id="phone"
              label="Phone"
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
            />
        </Box>
        <Button variant="contained" onClick={() => handleClick()}>Register</Button>
        <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
      </div>
      </Container>

  );
}
