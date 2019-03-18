import React from "react";

import TagItem from "../TagItem"
import {
  Wrapper
} from "./styles"

const TagList = ({
  tags,
  handleDelete
}) => {
  return (
    <Wrapper>
      {tags.map(tag => (<TagItem key={tag} handleDelete={handleDelete}>{tag}</TagItem>))}
    </Wrapper>
  );
};

export default TagList;