import React, { Component } from 'react';

class MushroomCard extends Component{

  render(){
    // console.log(this.props)
    return(
      <div
        className='mushroom-card'
        style={{
          top: `${Math.random() * 450}px`,
          left: `${Math.random() * 90}%`
        }}>
        <img
          style={{
            animationName: `${Math.random() > 0.5 ? 'wiggle' : 'bounce'}`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${0.5 + Math.random() * 3}s`
          }}
          src={require(`../public/images/${this.props.mushroom.image}`)} alt=""/>
        <br />
        <button onClick={() => this.props.sellMushroom(this.props.mushroom)}>
          Salvage {this.props.mushroom.name}
        </button>
      </div>
    )
  }
}
export default MushroomCard
