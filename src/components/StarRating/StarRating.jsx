import PropTypes from "prop-types";

import { BsStar, BsStarFill } from "react-icons/bs";

const StarRating = ({ product, size }) => {
  return (
    <div className="d-flex align-items-center mt-2 mb-3">
      {[1, 1, 1, 1, 1].map((_, i) =>
        product.product_rating >= i + 1 ? (
          <BsStarFill key={i} className="me-1" color="orange" size={size} />
        ) : (
          <BsStar key={i} className="me-1" size={size} />
        )
      )}
      <span className="p-1 text-secondary rounded-circle">
        {product.product_rating}
      </span>
    </div>
  );
};

StarRating.propTypes = {
  product: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
};

export default StarRating;
