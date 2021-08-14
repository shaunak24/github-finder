import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Search from './components/users/Search';
import Users from './components/users/Users';

class App extends Component {
  state = {
    loading: false,
    users: [],
    alert: null,
  };

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await fetch(
      `https://api.github.com/search/users?q=${text}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await res.json();
    this.setState({ loading: false, users: data.items });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  showAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { loading, users, alert } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClearBtn={users.length > 0 ? true : false}
                      showAlert={this.showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              ></Route>
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
