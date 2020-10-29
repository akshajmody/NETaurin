import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/interface.css';

export default function Interface() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [apiData, setApiData] = useState({});

  //AXIOS REQUEST
  //SET BOOK STATE
  useEffect(() => {
    axios.get(`https://api.rainforestapi.com/request?api_key=${process.env.REACT_APP_RF_API_KEY}&type=bestsellers&url=https%3A%2F%2Fwww.amazon.com%2Fbest-sellers-books-Amazon%2Fzgbs%2Fbooks&page=1&output=json`)
    .then((response) => {
      setApiData(response.data)
    })
  }, [])


  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.pushState('/login')
    } catch {
      setError('Logout Failed')
    }
  }

  let time = new Date().toLocaleTimeString('en-US');

  return (
    <>
      <Card className="interfaceCard">
        <Card.Body>
          <h2 className="text-center mb-2 mr-5 ml-5">Welcome back <strong>{currentUser.email}! </strong></h2>
          <div className="text-center mb-2">Today's bestsellers as of {time}:</div>
          <div className="bookList">
            {apiData.bestsellers ? apiData.bestsellers.slice(0,10).map((bestseller) =>
            <Link to={`/reviews/${bestseller.asin}`}>
              <Card key={bestseller.asin}> #{bestseller.rank}: {bestseller.title}
                <Card.Img src={bestseller.image} alt="book image" />
              </Card>
            </Link>) : <img className="loadImage" src="https://www.fpt-software.com/wp-content/themes/genesis_fpt-software/core/custom_ajax/loading2.gif" alt="loading"/>}
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
      </Card>
    </>
  )
}
