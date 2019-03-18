import React from "react";

import StatList from "../StatList"
import TagList from "../TagList"
import {
  Wrapper,
  Photo,
  Info,
  Title,
  Text
} from "./styles"

const SearchItem = ({
  pokemon
}) => {
  return (
    <Wrapper>
      <Photo src={pokemon.sprites.front_default}/>
      <Info>
        <Title>{pokemon.name}</Title>
        {pokemon.abilities && Array.isArray(pokemon.abilities) &&
        (<Text>{pokemon.abilities.map(item => item.ability.name).join(", ")}</Text>)}
        {pokemon.types && Array.isArray(pokemon.types) && (
          <TagList tags={pokemon.types.map(item => (item.type.name))}/>
        )}
        {pokemon.stats && Array.isArray(pokemon.stats) && (
          <StatList stats={pokemon.stats}/>
         )}
      </Info>
    </Wrapper>
  );
}

export default SearchItem;