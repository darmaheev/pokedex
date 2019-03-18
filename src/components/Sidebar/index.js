import React from "react";
import {
  Wrapper,
  Toggle,
  ToggleButton,
  Sidebar,
  Nav,
  NavItem
} from "./styles";

const SidebarComponent = ({
  showSidebar,
  handleShowSidebar,
  ...restProps
}) => (
<Wrapper hiddenSidebar={!showSidebar}>
  {showSidebar && <Sidebar {...restProps}>
    <Nav>
      <NavItem activeClassName="active" to="/search">
        Search
      </NavItem>
      <NavItem activeClassName="active" to="/about">
        About
      </NavItem>
    </Nav>
  </Sidebar>}
  <Toggle>
    <ToggleButton
      hiddenSidebar={!showSidebar}
      onClick={handleShowSidebar}
    />
  </Toggle>
</Wrapper>

);

export default SidebarComponent;
