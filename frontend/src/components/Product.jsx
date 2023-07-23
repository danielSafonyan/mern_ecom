import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = (props) => {
    console.log(props)
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${props._id}`}>
            <Card.Img src={props.image} variant='top' />
        </Link>

        <Card.Body>
            <Link to={`/product/${props._id}`}>
            <Card.Title className='product-title' as="div">{props.name}</Card.Title>
            <Card.Text as="div"><Rating value={props.rating} text={`${props.numReviews} reviews`}/></Card.Text>
            <Card.Text as="h3">{props.price}</Card.Text>
        </Link>
        </Card.Body>
    </Card>
  )
}

export default Product
