import React from "react";

import {
  Wrapper,
  Label,
  Value
} from "./styles"

const StatList = ({
  label,
  value
}) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Wrapper>
  );
};

export default StatList;