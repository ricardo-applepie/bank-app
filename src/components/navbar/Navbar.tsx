import React from 'react';
import { Button, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";
  const isResgister = location.pathname === "/register";


  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Container>
          <div className="d-flex justify-content-between">
            <span className="navbar-brand fw-bold"> Milleon</span>
            <div >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  {isLogin && (
                    <Button variant="contained" onClick={() => navigate('/register')}>Register</Button>
                  )}
                  {isResgister && (
                    <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
                  )}
                </li>
              </ul>
            </div>
          </div>  
        </Container>
      </nav>
  );
}
