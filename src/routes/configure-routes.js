import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/app/app';
import HomePage from '../containers/home-page/home-page';
import AlysMarsPage from '../containers/alys-mars-page/alys-mars-page';

export default function configureRoutes() {
  return (
    <Route path="/mars-amenothep" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="ackack" component={AlysMarsPage}/>
    </Route>
  );
}
