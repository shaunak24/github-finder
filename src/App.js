import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';

class App extends Component {
  state = {
    loading: false,
    users: [],
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

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
