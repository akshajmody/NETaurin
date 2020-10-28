import React from 'react'
import { useParams } from 'react-router-dom'


export default function Reviews() {
  const { asin } = useParams();


  //MAKE ANOTHER REQUEST BASED ON ASIN


  return (
    <div>
      BOOK TEST PARAM {asin}
    </div>
  )
}
