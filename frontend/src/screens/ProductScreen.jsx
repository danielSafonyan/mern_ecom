import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'

const ProductScreen = () => {
    const { id: productId } = useParams() 
    const [product, setProduct] = useState(null)
    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    if (!product) {
        return <h2>Loading product.</h2>
    }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go back</Link>
      <Row>
        <Col md={4}>
            <Image src={`..${product.image}`} alt={product.name} fluid />
        </Col>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Desciption: {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Price:
                            </Col>
                            <Col>
                                ${product.price}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <Button 
                            className='btn-block'
                            type='button'
                            disabled={product.countInStock === 0}
                            >
                                Add to Cart
                        </Button>
                    </ListGroup.Item>
                 </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
