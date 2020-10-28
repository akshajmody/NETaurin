import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Interface() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [bookState, setBookState] = useState({
    bookOne: "bookOne",
    bookTwo: "bookTwo",
    bookThree: "bookThree",
    bookFour: "bookFour",
    bookFive: "bookFive",
    bookSix: "bookSix",
    bookSeven: "bookSeven",
    bookEight: "bookEight",
    bookNine: "bookNine",
    bookTen: "bookTen"
  });



  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.pushState('/login')
    } catch {
      setError('Logout Failed')
    }
  }



  return (
    <>
      <Card>
      <div className="text-center">{bookState.bookOne}</div>
      <div className="text-center">{bookState.bookTwo}</div>
      <div className="text-center">{bookState.bookThree}</div>
      <div className="text-center">{bookState.bookFour}</div>
      <div className="text-center">{bookState.bookFive}</div>
      <div className="text-center">{bookState.bookSix}</div>
      <div className="text-center">{bookState.bookSeven}</div>
      <div className="text-center">{bookState.bookEight}</div>
      <div className="text-center">{bookState.bookNine}</div>
      <div className="text-center">{bookState.bookTen}</div>
        <Card.Body>
        <h2 className="text-center mb-4">Welcome Back <strong>{currentUser.email} </strong></h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Email:</strong> {currentUser.email}
        </Card.Body>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
      </Card>
    </>
  )
}
