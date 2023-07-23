import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'

const HomeScreen = () => {
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
