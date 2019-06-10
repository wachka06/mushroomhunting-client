import React, { Component } from 'react';
import './User.css'

class User extends Component {

  render(){
  return(
      <div className="user-info-section">
        <h2>{"Username: " + this.props.user.username}</h2>
        <h2>{"$$$:  " + this.props.user.amount}</h2>
      </div>
    )
  }
}

export default User
