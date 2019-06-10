import React, { Component } from 'react';
import Garden from './Garden'
import Menu from './menu'
import User from './User'

class GardenList extends Component {
  constructor() {
    super()
    this.state = {
      gardens: [],
      mushrooms: [],
      counter: 0,
      mounted: false
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/users/1")
      .then(res => res.json())
      .then(allGardens =>
        // console.log("ALLG", allGardens)
        { this.setState({
          gardens: allGardens.gardens,
          mushrooms: allGardens.gardens[0].mushrooms,
          mounted: true
        })
      }
    )
  }

  increaseCounter = () => {
    let count = parseInt(this.state.counter, 10) + 1
    if(count > this.state.gardens.length - 1){
      count = 0
      this.setState({counter: count})
    } else{
      this.setState({counter: count})
    }
  }

  decreaseCounter = () =>{
    let count = parseInt(this.state.counter, 10) - 1
    if(count < 0){
      count = this.state.mushrooms.length - 1
      this.setState({counter: count})
    } else{
      this.setState({counter: count})
    }
  }

  showGarden = () => {
    return this.state.gardens[this.state.counter]
  }

  showMushrooms = () => {
    // console.log("state is:   ",this.state);
    // console.log("the garden is: ", this.state.gardens[this.state.counter]);
    // console.log("the counter is this: ", this.state.counter);
    if (this.state.counter !== 0 || this.state.mounted){
      return this.state.gardens[this.state.counter].mushrooms
    }
    return this.state.mushrooms
  }

  findAndReplace = (newGarden) => {
    // console.log("New Garden b4 State: ", newGarden);
    let filterGarden = this.state.gardens.map(garden => {
      if (garden.id === newGarden.id){
        return newGarden
      } else {
        return garden
      }
    })
    this.setState({gardens: filterGarden})
  }

  addToGarden = (mushroom) => {

    let counter = this.state.counter
    let garden = this.state.gardens[counter].mushrooms
    let id = this.state.gardens[counter].id
    this.props.gameLogicBuyMushroom(mushroom)
    if (garden.length  < 125 ){
      fetch(`http://localhost:3000/gardens/${id}`,{
        method: 'PATCH',
        body: JSON.stringify(
          {mushrooms: [...garden, mushroom]}
        ),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(garden => {
        // console.log(garden);
        this.findAndReplace(garden)
      })
    }
  }

  sellMushroom = (mushroom) => {

    let counter = this.state.counter
    let id = this.state.gardens[counter].id
    let garden = this.state.gardens[counter]

    this.props.gameLogicSellMushroom(mushroom)

      fetch(`http://localhost:3000/gardens/${id}`,{
        method: 'DELETE',
        body: JSON.stringify(
          {
            mushroom_id: mushroom.id,
            garden: garden
          }
        ),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(newGarden => {
        // console.log(newGarden);
        this.findAndReplace(newGarden)
      })
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log("hit update");
  }

  render(){
    // console.log("gardens",this.state.gardens);
    // const {counter} = this.state
    return(
      <div>
        <User user={this.props.user}/>

        {this.state.gardens.length === 0 || this.state.mushrooms.length === 0 ? null : <Garden key={Math.floor(Math.random() * Math.floor(7026842189)) }
        displayedGarden={this.showGarden()}
        mushrooms={this.showMushrooms()}
        sellMushroom={this.sellMushroom}
        updateBank={this.props.updateBank}/>}
        <button className="button button5 nav-button" onClick={this.decreaseCounter}> Previous</button>
        <button className="button button5 nav-button" onClick={this.increaseCounter}> Next</button>
        <Menu id={1} addToGarden={this.addToGarden}/>
      </div>
    )
  }
}


export default GardenList
