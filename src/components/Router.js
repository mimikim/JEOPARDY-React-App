/**
 * Handles routing paths
 */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
// import Clue from './Clue/Clue';
import NotFound from './NotFound/NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ App } />
      <Route component={ NotFound } />
    </Switch>
  </BrowserRouter>
);

export default Router;
