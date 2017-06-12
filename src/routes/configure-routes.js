import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/app/app';
import HomePage from '../containers/home-page/home-page';
import AlysMarsPage from '../containers/alys-mars-page/alys-mars-page';

export default function configureRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="ackack" component={AlysMarsPage}/>
    </Route>
  );
}
