import PropTypes from "prop-types";

import { Button, Card, Col } from "react-bootstrap";

import StarRating from "../StarRating/StarRating";

const ProductCard = ({ product }) => {
  return (
    <Card className="product-card mt-4 h-100 p-0" key={product?.product_id}>
      <Card.Img
        variant="top"
        alt={product?.product_name}
        src={product?.product_image_url}
      />
      <Card.Body className="text-start d-flex flex-column">
        <div className="d-flex justify-content-between align-items-top">
          <Card.Title as={Col} className="fw-bold m-0">
            {product?.product_name.split(" ")[0]}
            <p className="h6 text-muted">{product.product_category}</p>
          </Card.Title>
          <Card.Text as={Col} className="fw-bold text-end">
            $&nbsp;<span className="h3 m-0">{product?.product_price}</span>
          </Card.Text>
        </div>
        <p className="text-muted m-0 ">{product.product_shortdesc}</p>
        <StarRating product={product} size={20} />
        <Button className="py-2 px-4 my-0 rounded-5" variant="outline-dark">
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
