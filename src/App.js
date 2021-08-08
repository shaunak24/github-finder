import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

class App extends Component {
  state = {
    loading: false,
    users: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await fetch('https://api.github.com/users');
    const data = await res.json();
    this.setState({ loading: false, users: data });
  }

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
