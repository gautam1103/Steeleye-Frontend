import React, { useReducer, useCallback } from "react";
import PropTypes from "prop-types";

// Reducer for handling state updates
const listReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_ITEM":
      return { ...state, selectedItem: action.payload };
    case "RESET_ITEMS":
      return { ...state, selectedItem: null };
    default:
      return state;
  }
};

// Single List Item
const SingleListItem = React.memo(
  ({ isSelected, onClickHandler, text }) => {
    const handleClick = useCallback(() => {
      onClickHandler(text);
    }, [onClickHandler, text]);

    return (
      <li
        style={{ backgroundColor: isSelected ? "green" : "red" }}
        onClick={handleClick}
      >
        {text}
      </li>
    );
  }
);

SingleListItem.propTypes = {
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

// List Component
const ListComponent = ({ items }) => {
  const [{ selectedItem }, dispatch] = useReducer(listReducer, {
    selectedItem: null
  });

  const handleClick = useCallback(
    (text) => {
      dispatch({ type: "SELECT_ITEM", payload: text });
    },
    [dispatch]
  );

 

  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item) => (
        <SingleListItem
          key={item.text}
          onClickHandler={handleClick}
          text={item.text}
          isSelected={selectedItem === item.text}
        />
      ))}
    </ul>
  );
};

ListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  )
};
function Lists(){
const items = [
    {text:'list1'},
    {text:'list2'},
    {text:'list3'},
    {text:'list4'},
    {text:'list5'},
    {text:'list6'},
];

return <ListComponent items={items}/>
}

export default Lists;
