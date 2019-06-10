import React, { Component } from 'react'
import GardenList from './GardenList'
// import Menu from './menu.js'
// import User from './User'

class GameLogic extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      amount: 0
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/users/1")
      .then(res => res.json())
      .then(user =>{
        this.setState({
          id: user.id,
          username: user.username,
          password: user.password,
          amount: user.amount
        })
      })
  }

  gameLogicSellMushroom = (mushroom) => {
      let newPrice = (this.state.amount + (mushroom.price * 1.3))
      this.updateBank(newPrice)
  }

  gameLogicBuyMushroom = (mushroom) => {
    if (this.state.amount > mushroom.price){
      let newPrice = this.state.amount - mushroom.price
      this.updateBank(newPrice)
    }else {
      alert('Sorry, you\'re broke :/')
    }
  }

  updateBank = (price) => {
    fetch(`http://localhost:3000/users/${this.state.id}`,{
      method: 'PATCH',
      body: JSON.stringify(
        {amount: price}
      ),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(user => this.setState({amount: user.amount}))
  }

  render(){
    return(
      <div>
        <GardenList gameLogicSellMushroom={this.gameLogicSellMushroom}
          gameLogicBuyMushroom={this.gameLogicBuyMushroom}
          user={this.state}/>
      </div>
    )
  }


}

export default GameLogic
