import React from "react";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import SearchScreen from "../screens/SearchScreen";
import PokemonScreen from "../screens/PokemonScreen";
import ErrorsScreen from "../screens/ErrorsScreen";

const ProtectedRoute = ({ component: Component, render, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={(props) => {
        return true/*restProps.isAuthenticated*/ ? (
            Component ? (
                <Component {...props} />
              ) : (
                render(props)
              )
          ) : (
            <Redirect to="/login" />
          );
      }}
    />
  );
};

const Routes = (props) =>
  true/*props.isInitialized*/ ? (
      <Switch>
        <Route exact path="/login" component={LoginScreen} />

        {/* Root path redirects to Search */}
        <ProtectedRoute
          exact
          path="/"
          render={(props) => <Redirect to="/search" {...props} />}
          {...props}
        />

        {/* Search */}
        <ProtectedRoute
          exact
          path="/search"
          render={(props) => <SearchScreen {...props} />}
          {...props}
        />

        <ProtectedRoute
          exact
          path="/search/:id/"
          render={(props) => (
            <Redirect
              to={`/pokemon/${props.match.params.id}/details`}
              {...props}
            />
          )}
          {...props}
        />

        <ProtectedRoute
          exact
          path="/pokemon/:id/:block"
          render={(props) => <PokemonScreen {...props} />}
          {...props}
        />

        {/* Errors */}
        <ProtectedRoute
          exact
          path="/errors"
          render={(props) => <ErrorsScreen {...props} />}
          {...props}
        />

      </Switch>
    ) : null;

export default withRouter(Routes);
