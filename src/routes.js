import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import Books from './pages/Books';
import Book from './pages/Book';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import Illustrators from './pages/Illustrators';
import CreateIllustrator from './pages/CreateIllustrator';
import Licensors from './pages/Licensors';
import CreateLicensor from './pages/CreateLicensor';
import Publishers from './pages/Publishers';
import CreatePublisher from './pages/CreatePublisher';
import Writers from './pages/Writers';
import CreateWriter from './pages/CreateWriter';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />

      <Route exact path="/users" component={Users} />
      <Route exact path="/users/create" component={CreateUser} />
      {/* <Route path="/users/:id" component={User} /> */}

      <Route exact path="/books/create" component={CreateBook} />
      <Route exact path="/books/:id" component={Book} />
      <Route exact path="/books/:id/edit" component={EditBook} />
      <Route exact path="/books" component={Books} />

      <Route exact path="/writers" component={Writers} />
      <Route exact path="/writers/create" component={CreateWriter} />
      <Route exact path="/licensors" component={Licensors} />
      <Route exact path="/licensors/create" component={CreateLicensor} />
      <Route exact path="/publishers" component={Publishers} />
      <Route exact path="/publishers/create" component={CreatePublisher} />
      <Route exact path="/illustrators" component={Illustrators} />
      <Route exact path="/illustrators/create" component={CreateIllustrator} />
    </Switch>
  );
}

export default Routes;
