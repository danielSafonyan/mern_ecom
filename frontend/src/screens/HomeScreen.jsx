import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
    const displayedProducts = products.map(el => {
        return <Col key={el._id} sm={12} md={6} lg={4} xl={3}>
            <Product {...el} />
            </Col>
    })
  return (
    <>
      <h1>Latest Products</h1>
      <Row>{displayedProducts}</Row>
    </>
  )
}

export default HomeScreen
