import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './register.css';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", phone: "", password: ""});
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     console.log(formData)
     const value = event.target.value;
     const id = event.target.id;
     setFormData({...formData,[id]: value });
  };

  const handleClick = () => {
    const formKeys = Object.keys(formData);
    const isValid = formKeys.every((value) => value.length > 0);
    setLoading(true);
    if(!isValid) return;
    const url = 'https://bank-backend-nh15.onrender.com/user'; // Replace with your URL

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
        navigate('/login');
        setLoading(false);
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <Container maxWidth="sm">
      <div className="form">
        <h1 className="text-center my-2">Register now</h1>
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
          <div className="px-2 mt-4">
            <Button 
              variant="contained" 
              className="py-2 px-3" 
              onClick={() => handleClick()}
            >
              Register
            </Button>
            {loading && (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            )}
          </div>
      </div>
    </Container>
  );
}
