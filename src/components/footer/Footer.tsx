import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";
  const isResgister = location.pathname === "/register";


  return (
      <footer className="navbar navbar-expand-lg navbar-light bg-light">
        <Container>
          <div className="d-flex justify-content-between">
            <div className="w-25">
             <a className="navbar-brand fw-bold" href="#">Milleon</a>
             <p>
               We are your competent & experienced contact in the field of online banking.
             </p>
            </div>
            <div className="w-25">
  
            </div>
            <div className="w-25">
                
            </div>
            <div className="w-25">
              We reserve all rights @2024 Milleon.
            </div>
          </div>  
        </Container>
      </footer>
  );
}
