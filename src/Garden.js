import React, { Component } from 'react';
import MushroomCard from './MushroomCard'
import './Garden.css'


class Garden extends Component {

  increaseCounter = () => {
    this.setState({counter: this.state.counter + 1})
  }

  render(){
    const  { displayedGarden, mushrooms } = this.props
    return(
      <div className='garden-section'>
        <h2> Garden: {displayedGarden.name} </h2>
        <div className='garden'>
          {
            mushrooms.map(mshrm => {
              return <MushroomCard mushroom={mshrm}
                 key={mshrm.id}
                 sellMushroom={this.props.sellMushroom}/>
            })
          }
        </div>
      </div>
    )
  }

}

export default Garden
