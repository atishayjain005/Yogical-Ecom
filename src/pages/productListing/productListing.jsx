import { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProductCard from "../../components/ProductCard/ProductCard";
import PaginationComponent from "../../components/PaginationComp/PaginatonComp";
import DropdownComp from "../../components/DropdownComp/DropdownComp";

const ProductListing = ({
  searchTerm,
  setSearchTerm,
  products,
  currentPage,
  setCurrentPage,
}) => {
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [itemsPerPage] = useState(20);
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });
  const [availability, setAvailability] = useState("All");

  const allCategories = [
    ...new Set(products.map((product) => product.product_category)),
  ];

  const handleFilterChange = (event) => {
    setCategory(event.target.innerText);
    setCurrentPage(1);
    setSearchTerm("");
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.innerText.toLowerCase());
  };

  const handlePriceChange = (event, type) => {
    const value = event.target.value;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [type]: value,
    }));
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.innerText);
    setCurrentPage(1);
  };

  const handleCategoryChange = (product) => {
    return category === "All" ? true : category === product.product_category;
  };

  const handlePriceFilter = (product) => {
    if (priceRange.min === "" && priceRange.max === "") {
      return true; // No price range filter
    } else if (priceRange.min !== "" && priceRange.max !== "") {
      return (
        product.product_price >= parseInt(priceRange.min) &&
        product.product_price <= parseInt(priceRange.max)
      );
    } else if (priceRange.min !== "") {
      return product.product_price >= parseInt(priceRange.min);
    } else if (priceRange.max !== "") {
      return product.product_price <= parseInt(priceRange.max);
    }
  };

  const handleAvailabilityFilter = (product) => {
    if (availability === "All") {
      return true;
    } else if (availability === "In Stock") {
      return product.product_availability === true;
    } else if (availability === "Out of Stock") {
      return product.product_availability === false;
    }
  };

  const applySorting = (a, b) => {
    if (sortOrder === "price-low-to-high") {
      return a.product_price - b.product_price;
    } else if (sortOrder === "price-high-to-low") {
      return b.product_price - a.product_price;
    } else if (sortOrder === "popularity") {
      return b.product_rating - a.product_rating;
    }
  };

  const sortedProducts = products.sort(applySorting);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProducts = sortedProducts
    .filter(handleCategoryChange)
    .filter(handlePriceFilter)
    .filter(handleAvailabilityFilter)
    .filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container>
      <Row className="pt-3">
        <Col className="filters">
          <Dropdown>
            <Dropdown.Toggle
              className="py-3 px-4 my-0 rounded-5"
              variant="light"
              id="dropdown-basic"
            >
              Filters
            </Dropdown.Toggle>
            <Dropdown.Menu className=" p-2 bg-light">
              <Button
                className="w-100 text-start"
                variant="light"
                value={"All"}
                onClick={handleFilterChange}
              >
                All
              </Button>
              <Dropdown.Divider />
              <DropdownComp
                dropdownItem={allCategories}
                func={handleFilterChange}
                toggle="Categories"
                className="w-100 text-start"
              />
              <Dropdown.Divider />
              <DropdownComp
                dropdownItem={["All", "In Stock", "Out of Stock"]}
                func={handleAvailabilityChange}
                toggle="Availability"
                className="w-100 text-start"
              />
              <Dropdown.Divider />
              <Dropdown className="w-100">
                <Dropdown.Toggle
                  className="w-100 text-start"
                  variant="light"
                  id="dropdown-basic"
                >
                  Price Range
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className=" p-4 text-center "
                  style={{ width: "max-content" }}
                >
                  <Form.Control
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange(e, "min")}
                  />
                  to
                  <Form.Control
                    type="number"
                    placeholder="1000"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(e, "max")}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="text-end">
          <DropdownComp
            dropdownItem={[
              "Price-low-to-high",
              "Price-high-to-low",
              "Popularity",
            ]}
            func={handleSortChange}
            toggle="Sort by"
            className="py-3 px-4 my-0 rounded-5"
          />
        </Col>
      </Row>
      {/* card section */}
      <Row className="mb-4  align-items-stretch">
        {currentProducts.map((product) => (
          <Col sm={6} md={4} lg={3} className="h-100" key={product.product_id}>
            <Link
              className="text-decoration-none text-dark"
              to={`/${product.product_id}`}
            >
              <ProductCard product={product} />
            </Link>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <PaginationComponent
            itemsCount={sortedProducts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            alwaysShown={false}
          />
        </Col>
      </Row>
    </Container>
  );
};

ProductListing.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default ProductListing;
