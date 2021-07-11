import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoggedDash from './master-page/Logged';
import { EditUser, ListUsers, Login, NewUser, NotFound } from './pages';
import TelesubscriptionsList from './pages/telesubscription/telesubscriptionsList';
import TelesubscriptionDetail from './pages/telesubscription/telesubscriptionDetail';

import DpsDetail from './pages/dps/detail';

import DpsList from './pages/dps/dpsList';
import ReproductionList from './pages/reproduction/reproList';
import NewCalf from './pages/dps/new';

const LoggedDashRoutes = (props: any) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return localStorage.getItem(process.env.REACT_APP_KEY_TOKEN ?? '') ? (
          <LoggedDash>
            <Component {...props} />
          </LoggedDash>
        ) : (
          (window.location.href = '/login')
        );
      }}
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />

      <LoggedDashRoutes exact path="/" component={DpsList} />
      <LoggedDashRoutes exact path="/usuarios" component={ListUsers} />
      <LoggedDashRoutes exact path="/usuarios/novo" component={NewUser} />
      <LoggedDashRoutes exact path="/animal/novo" component={NewCalf} />
      <LoggedDashRoutes
        exact
        path="/usuarios/:_id/editar"
        component={EditUser}
      />
      <LoggedDashRoutes
        exact
        path="/medicines"
        component={TelesubscriptionsList}
      />
      <LoggedDashRoutes
        exact
        path="/telesubscription/:_id"
        component={TelesubscriptionDetail}
      />
      <LoggedDashRoutes
        exact
        path="/reproduction"
        component={ReproductionList}
      />

      <LoggedDashRoutes exact path="/dps/:_id" component={DpsDetail} />

      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
