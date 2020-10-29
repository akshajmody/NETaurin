import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
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
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');

  //Only pulling all reviews where the ASIN# is the same ASIN as the one clicked
  const ref = fire.firestore().collection('reviews').where("asin", "==", `${asin}`);
  const ref2 = fire.firestore().collection('reviews');

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

  function postReview(e) {
    e.preventDefault();
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

    ref2.add({
      id: uuidv4(), user: currentUser.email, asin: asin, rating: rating, comments: comments , date: dateTime,
    })
    .catch(function(error) {
      console.error("ERROR ADDING DOCUMENT: ", error)
    });
  }

  //When component mounts - API call is made to retrieve image and relevant data so that this link can be accessed without needing to retrieve data from the main interface page
  useEffect(() => {
    axios.get(`https://api.rainforestapi.com/request?api_key=${process.env.REACT_APP_RF_API_KEY}&type=product&amazon_domain=amazon.com&asin=${asin}&output=json`)
    .then((response) => {
      setBookData(response.data)
    })
    getReviews();
  }, [asin])




  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Card>
      {bookData.product ? <Card.Img className="mt-3 mb-2" src={bookData.product.main_image.link} alt="book images"/> : <Card.Img className="loadImage" src="https://www.fpt-software.com/wp-content/themes/genesis_fpt-software/core/custom_ajax/loading2.gif" alt="loading"/>}
      <div className="reviewHeader">Add a review:</div>
        <Form onSubmit={postReview}>
          <Form.Group id="rating" className="w-25">
            <Form.Label>Rating (1 to 5)</Form.Label>
            <Form.Control onChange={(e) => setRating(e.target.value)} as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Comments</Form.Label>
            <Form.Control onChange={(e) => setComments(e.target.value)} placeholder="Please share your thoughts on this book"/>
          </Form.Group>
          <Button variant="success" className="w-50"  type="submit">Submit Review</Button>
        </Form>
      <div className="reviewHeader">NETaurin community reviews:</div>
      {reviews.map((review) => (
        <Card key={review.id}>
          <div><strong>User: {review.user}</strong></div>
          <div><strong>Rating:</strong> {review.rating}</div>
          <div className="comments"><strong>Comments:</strong> {review.comments}</div>
          <div>{review.date}</div>
        </Card>
      ))}

    </Card>
  )
}


