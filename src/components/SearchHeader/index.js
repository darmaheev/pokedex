import React from "react";
import {FaFilter} from "react-icons/fa";
import TagList from "../TagList";
import SearchHeaderFilterModal from "../SearchHeaderFilterModal"
import {
  Header,
  Input,
  SearchRow,
  FilterToggleButton
} from "./styles";

const SearchHeader = ({
  query,
  filters,
  typeList,
  newFilters,
  isVisibleModal,
  handleQueryChange,
  handleChangeFilters,
  handleModalOpen,
  handleModalClose,
  handleDeleteFilters
}) => (
  <Header>
    <SearchRow>
    <Input
      placeholder="Search..."
      name="query"
      value={query}
      onChange={handleQueryChange}
    />
    <FilterToggleButton squared onClick={handleModalOpen}>
      <FaFilter />
    </FilterToggleButton>
    </SearchRow>
    <TagList handleDelete={handleDeleteFilters} tags={filters}/>
    <SearchHeaderFilterModal
      filters={filters}
      filterList={typeList.map(type => type.name)}
      isOpen={isVisibleModal}
      onClose={handleModalClose}
      onChangeFilters={handleChangeFilters}
    />

  </Header>
);

export default SearchHeader;
