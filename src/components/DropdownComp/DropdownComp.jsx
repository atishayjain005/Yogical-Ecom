import PropTypes from "prop-types";

import { Dropdown } from "react-bootstrap";

const DropdownComp = ({ toggle, dropdownItem, func, className }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className={className}
        variant="light"
        id="dropdown-basic"
      >
        {toggle}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {dropdownItem.map((category, i) => (
          <Dropdown.Item key={i} onClick={func}>
            {category}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownComp.propTypes = {
  toggle: PropTypes.string.isRequired,
  dropdownItem: PropTypes.array.isRequired,
  func: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default DropdownComp;
