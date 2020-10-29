import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';


export default function Reviews() {
  const { asin } = useParams();
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    axios.get(`https://api.rainforestapi.com/request?api_key=${process.env.REACT_APP_RF_API_KEY}&type=product&amazon_domain=amazon.com&asin=${asin}&output=json`)
    .then((response) => {
      setBookData(response.data)
    })
  }, [asin])



  //MAKE ANOTHER REQUEST BASED ON ASIN

  // BOOK TEST PARAM {asin}

  return (
    <div>
      {bookData.product ? <img src={bookData.product.main_image.link} alt="book images"/> : <div>LOADING</div>}
    </div>
  )
}


