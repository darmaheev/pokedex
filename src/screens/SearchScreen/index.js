import React, { Component } from "react";
import {observer} from "mobx-react";
import {decorate, observable, action, computed} from "mobx";
import { fromPromise } from "mobx-utils";
import debounce from "lodash/debounce";
import SearchList from "../../containers/SearchList";
import Topbar from "../../containers/Topbar";
import Footer from "../../containers/Footer";
import Sidebar from "../../containers/Sidebar";
import SearchHeader from "../../containers/SearchHeader";
import Screen from "../../components/Screen";
import ScreenName from "../../components/ScreenName";
import Content from "../../components/Content";
import Main from "../../components/Main";
import MainHeader from "../../components/MainHeader";
import SearchListSpinner from "../../components/SearchListSpinner";
import Api from "../../api"

const SearchScreen = observer(class SearchScreen extends Component {

  typeList = {};

  pokemonList = {};

  page = {
    start: 1,
    pageSize: 20,
    total: 150
  };

  typeNameList = {};

  pokemonNameList = {};

  query = "";

  filters = [];

  componentWillMount() {
    this.fetchPokemonNameList();
    this.fetchTypeNameList();
  }

  fetchTypeNameList() {
    this.typeNameList = fromPromise(Api.search.getTypeList());
    this.typeNameList.then(response => {
      this.fetchTypes(response.data.results)
    });
  }

  get fetchedTypeNameList() {
    if (this.typeNameList.state === "fulfilled") {
      return this.typeNameList.value.data.results;
    } else {
      return []
    }
  }

  fetchTypes = (results) => {
    const promises = results.map(type => Api.search.getType(type.name));
    this.typeList = fromPromise(Promise.all(promises));
  };

  get fetchedTypeList() {
    if (this.typeList.state === "fulfilled") {
      let initialObject = {};
      return this.typeList.value.reduce((typeListObject, value) => ({...typeListObject, [value.data.name]: value.data.pokemon.map(p => p.pokemon.name)}), initialObject)
    } else {
      return [];
    }
  }

  getPokemonListPromises = () => {
    const promises = [];
    for (let i = this.fetchedPage.start; i < Math.min((this.fetchedPage.start + this.fetchedPage.pageSize), this.fetchedPage.total + 1); i = i + 1) {
      promises.push(Api.search.getPokemon(this.fetchedPokemonNameList[i-1]))
    }
    return Promise.all(promises);
  }

  fetchPokemonList() {
    this.pokemonList = fromPromise(this.getPokemonListPromises());
  }

  get fetchedPokemonList() {
    if (this.pokemonList.state === "fulfilled") {
      return this.pokemonList.value.map(value => value.data);
    } else {
      return []
    }
  }

  changePage = (newPage) => {
    this.page = newPage;
    this.fetchPokemonList();
  };

  fetchPokemonNameList() {
    this.pokemonNameList = fromPromise(Api.search.getAllPokemonName());
    this.pokemonNameList.then(response => this.fetchPokemonList())
  }

  get fetchedPokemonNameList() {
    if (this.pokemonNameList.state === "fulfilled") {
      let pokemonNameList = this.pokemonNameList.value.data.results.map(value => value.name);
      if (this.filters.length > 0) {
        let initialPokemonArray = [];
        console.log("this.filters", this.filters);
        console.log("this.fetchedTypeList", this.fetchedTypeList);
        let pokemonTypesNameList = this.filters.reduce((pokemonList, type) => ([...pokemonList, ...this.fetchedTypeList[type]]), initialPokemonArray);
        pokemonNameList = pokemonNameList.filter(pokemon => pokemonTypesNameList.findIndex(pok => pok === pokemon) !== -1);

        console.log("pokemonNameList", pokemonNameList);
      }
      if (this.query !== "") {
        return pokemonNameList.filter(name => name.indexOf(this.query.toLowerCase()) !== -1);
      } else {
        return pokemonNameList;
      }
    } else {
      return []
    }
  }

  get fetchedPage() {
    if (this.pokemonNameList.state === "fulfilled") {
      return {...this.page, total: this.fetchedPokemonNameList.length};
    } else {
      return this.page
    }
  }

  handleQueryChange = (value) => {
    this.query = value;
    this.changePage({...this.page, start: 1})
    this.fetchPokemonList()
  };

  handleQueryChangeDebounce = debounce(this.handleQueryChange, 500);

  handleFiltersChange = (filters) => {
    this.filters = [...filters];
    this.changePage({...this.page, start: 1})
    this.fetchPokemonList()
  };

  render() {
    console.log("this.page", this.fetchedPage);
    console.log("this.pokemonList", this.fetchedPokemonList.map(p => p.name));
    console.log("this.typeList", this.fetchedTypeList);
    return (
      <Screen>
        <Topbar />
        <Content>
          <Sidebar />
          <Main>
            <ScreenName>Pokémon Search</ScreenName>
            <MainHeader>
              <SearchHeader
                {...this.props}
                typeList={this.fetchedTypeNameList}
                pokemonNameList={this.fetchedPokemonNameList}
                handleQueryChange={this.handleQueryChangeDebounce}
                handleFiltersChange={this.handleFiltersChange}
              />
            </MainHeader>

            {this.pokemonList.state === "pending"? (
                <SearchListSpinner />
              ) : (
                <SearchList {...this.props} pokemonList={this.fetchedPokemonList} page={this.fetchedPage} changePage={this.changePage}/>
              )}
          </Main>
        </Content>
        <Footer/>
      </Screen>
    );
  }
})

decorate(SearchScreen, {
  typeNameList: observable,
  fetchTypeNameList: action,
  fetchedTypeNameList: computed,
  pokemonList: observable,
  fetchPokemonList: action,
  fetchedPokemonList: computed,
  page: observable,
  changePage: action,
  pokemonNameList: observable,
  fetchPokemonNameList: action,
  fetchedPokemonNameList: computed,
  fetchedPage: computed,
  query: observable,
  handleQueryChange: action,
  filters: observable,
  handleFiltersChange: action,
  typeList: observable,
  fetchTypes: action,
  fetchedTypeList: computed
});

export default SearchScreen;
