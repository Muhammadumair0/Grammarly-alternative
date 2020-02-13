import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api', {method: 'get'})
      .then(res => {
        return res.text();
      })
      .then(result => {
        console.log('we are getting back response' , result)
      })
      // .then(user => this.setState({ username: user.username }))
      .catch(e => console.log('e',e));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        HIs
      </div>
    );
  }
}
