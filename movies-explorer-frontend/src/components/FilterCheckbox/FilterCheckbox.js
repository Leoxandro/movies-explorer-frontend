import React from "react";
import uncheckedImage from "../../images/slider-off.svg";
import checkedImage from "../../images/slider-on.svg";

const FilterCheckbox = ({ checked, onChange }) => {
  return (
    <div onClick={onChange}>
      <img src={checked ? checkedImage : uncheckedImage} alt="checkbox" />
    </div>
  );
};

export default FilterCheckbox;
