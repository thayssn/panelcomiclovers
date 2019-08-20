import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Users from './pages/Users';
import Books from './pages/Books';
import Book from './pages/Book';
import CreateBook from './pages/CreateBook';
import Illustrators from './pages/Illustrators';
import Licensors from './pages/Licensors';
import Publishers from './pages/Publishers';
import Writers from './pages/Writers';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />

      <Route exact path="/users" component={Users} />

      <Route exact path="/books" component={Books} />
      <Route path="/books/create" component={CreateBook} />
      <Route path="/books/:id" component={Book} />

      <Route exact path="/writers" component={Writers} />

      <Route exact path="/licensors" component={Licensors} />
      <Route exact path="/publishers" component={Publishers} />
      <Route exact path="/illustrators" component={Illustrators} />
    </Switch>
  );
}

export default Routes;
