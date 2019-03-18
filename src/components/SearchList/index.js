import React from "react";
import PropTypes from "prop-types";
import SearchItem from "../SearchItem";
import Pagination from "../Pagination";
import {
  Wrapper,
  List
} from "./styles";

const SearchList = ({
  pokemonList,
  page,
  changePage,
  ...restProps
}) => (
  <Wrapper>
    <List>
      {pokemonList && Array.isArray(pokemonList) && pokemonList.map(pokemon => (
        <SearchItem key={pokemon.id} {...restProps} pokemon={pokemon}/>))}

    </List>
    {pokemonList.length > 1 && (
      <Pagination
        total={page.total}
        pageSize={page.pageSize}
        start={page.start}
        onPageClick={changePage}
        withPages
        withPageSize
      />
    )}
  </Wrapper>
);

SearchList.defaultProps = {
  pokemonList: []
};

SearchList.propTypes = {
  pokemonList: PropTypes.arrayOf(PropTypes.shape())
};

export default SearchList;
