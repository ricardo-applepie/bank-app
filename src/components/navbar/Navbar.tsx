import React from 'react';
import { Button, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import { Badge } from 'react-bootstrap';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";
  const isResgister = location.pathname === "/register";
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }

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
                  {token && (
                    <div className="flex">
                      <Badge color="secondary" className="mx-2">
                        <MailIcon />
                      </Badge>
                      <Button  variant="contained" onClick={() => logout()}>Logout</Button>
                  </div>
                  )}
                </li>
              </ul>
            </div>
          </div>  
        </Container>
      </nav>
  );
}
