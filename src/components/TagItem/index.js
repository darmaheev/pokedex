import React from "react";

import {
  Wrapper,
  DeleteItem
} from "./styles"

const TagItem = ({
  children,
  handleDelete
}) => {
  return (
    <Wrapper>
      {children}
      {typeof handleDelete === "function" && <DeleteItem onClick={() => handleDelete(children)}/>}
    </Wrapper>
  );
};

export default TagItem;