import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useLocation } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

import productsData from "../../constants/mock_data.json"; // Assuming products.json is in the same directory

import StarRating from "../../components/StarRating/StarRating";

const ProductDetailPage = ({ setItemCount, itemCount }) => {
  let location = useLocation();

  const productId = parseInt(location.pathname.slice(1));
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Filter the productsData array to find the matching product
    const matchedProduct = productsData.find(
      (product) => product.product_id === productId
    );

    if (matchedProduct) {
      setProduct(matchedProduct);
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }
  console.log(product);

  return (
    <Container>
      <Row className="py-5 ">
        <Col sm={5}>
          <img
            className="rounded-3"
            src={product.product_image_url}
            width="100%"
            alt="product-img"
          />
          <Row className="mt-4">
            <Col>
              <img
                className="rounded-3"
                src={product.product_image_url}
                width="100%"
                alt="product-img"
              />
            </Col>
            <Col>
              <img
                className="rounded-3"
                src={product.product_image_url}
                width="100%"
                alt="product-img"
              />
            </Col>
            <Col>
              <img
                className="rounded-3"
                src={product.product_image_url}
                width="100%"
                alt="product-img"
              />
            </Col>
            <Col>
              <img
                className="rounded-3"
                src={product.product_image_url}
                width="100%"
                alt="product-img"
              />
            </Col>
          </Row>
        </Col>
        <Col sm={7} className="d-flex flex-column gap-4 ps-sm-4 pt-3 pt-sm-0">
          <div>
            <h1 className="fw-bold display-4">{product.product_name}</h1>
            <p className=" py-3">{product.product_longdesc}</p>
            <StarRating product={product} size={30} />
          </div>
          <hr className="border border-secondary" />
          <div>
            <h2 className="fw-bold">
              ${product.product_price}&nbsp;or&nbsp;{product.product_price / 6}
              /month
            </h2>
            <span className="text-muted">
              suggested payments with 6 months special financing
            </span>
          </div>
          <hr className="border border-secondary" />

          <Row>
            <Col>
              <Button
                className="fw-bold py-3 px-4 my-0 w-100 rounded-5"
                variant="success"
              >
                Buy Now
              </Button>
            </Col>
            <Col>
              <Button
                className="fw-bold py-3 px-4 my-0 w-100 rounded-5"
                variant="outline-success"
                onClick={() => setItemCount(itemCount + 1)}
              >
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

ProductDetailPage.propTypes = {
  setItemCount: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
};

export default ProductDetailPage;
