import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../Register/register.css';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({username: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [errorMessage, showErrorMessage ] = useState(false);
  const token  = localStorage.getItem("token");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const value = event.target.value;
     const id = event.target.id;
     setFormData({...formData,[id]: value });
  };

  const navigate = useNavigate();


  const handleClick = () => {
    const formKeys = Object.keys(formData);
    setLoading(true);
    showErrorMessage(false);

    const isValid = formKeys.every((value) => value.length > 0);
    if(!isValid) return;
    const url = 'https://bank-backend-nh15.onrender.com/login'; // Replace with your URL

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
        localStorage.setItem("token", data.token);
        navigate("/account");
        setLoading(false);
      })
      .catch(error => { 
        showErrorMessage(true);
        setLoading(false);
      });
    }
  useEffect(() => {
    if(token) {
      navigate("/account");
    }
  }, []);
  return (
    <Container maxWidth="sm">
      <div className='form'>
        <h1 className="text-center my-2">Login Now</h1>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="username"
            label="username"
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
        <div className="px-2 mt-3">
          <Button variant="contained" onClick={() => handleClick()}>login</Button>
          {loading && (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          )}
          {errorMessage &&( 
            <p className="text-danger">
              Username or password is wrong
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
