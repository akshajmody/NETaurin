import React from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Interface from './Interface';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Reviews from './Reviews';

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
      {/* <div className="w-100" style={{ maxWidth: '425px' }}> */}
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Interface} />
              <PrivateRoute exact path="/reviews/:asin" component={Reviews}/>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
      {/* </div> */}
    </Container>
  )
}

export default App;
