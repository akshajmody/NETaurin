import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import fire from '../firebase'
import '../styles/reviews.css';

export default function Reviews() {
  const { asin } = useParams();
  const { currentUser } = useAuth();
  const [bookData, setBookData] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  //Only pulling all reviews where the ASIN# is the same ASIN as the one clicked
  const ref = fire.firestore().collection('reviews').where("asin", "==", `${asin}`);

  //On Snapshot allows real time updating of comments rendered whenever firestore data is updated
  function getReviews() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setReviews(items);
      setLoading(false);
    });
  }

  //When component mounts - API call is made to retrieve image and relevant data so that this link can be accessed without needing to retrieve data from the main interface page
  useEffect(() => {
    axios.get(`https://api.rainforestapi.com/request?api_key=${process.env.REACT_APP_RFN_API_KEY}&type=product&amazon_domain=amazon.com&asin=${asin}&output=json`)
    .then((response) => {
      setBookData(response.data)
    })
    getReviews();
  }, [asin])

  async function handleSubmit(e) {
    e.preventDefault();
  }


  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Card>
      {bookData.product ? <Card.Img className="mt-3 mb-2" src={bookData.product.main_image.link} alt="book images"/> : <Card.Img className="loadImage" src="https://www.fpt-software.com/wp-content/themes/genesis_fpt-software/core/custom_ajax/loading2.gif" alt="loading"/>}
      <div>Add a review:</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="rating">
            <Form.Label>Rating (1 to 5)</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>

          </Form.Group>
        </Form>
      <div className="reviewHeader">NETaurin community reviews:</div>
      {reviews.map((review) => (
        <Card key={review.id}>
          <div><strong>User: {review.user}</strong></div>
          <div><strong>Rating:</strong> {review.rating}</div>
          <div className="comments"><strong>Comments:</strong> {review.comments}</div>
        </Card>
      ))}

    </Card>
  )
}


{/* <Form onSubmit={handleSubmit}>
  <Form.Group id="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" ref={emailRef} required />
  </Form.Group>
  <Form.Group id="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" ref={emailRef} required />
  </Form.Group>
  <Form.Group id="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" ref={passwordRef} required />
  </Form.Group>
  <Button variant="success" disabled={loading} className="w-100" type="submit">LOG IN</Button>
</Form> */}
