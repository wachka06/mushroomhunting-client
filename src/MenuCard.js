import React from 'react';

const MenuCard = props => (
  <div className='mushroom-list-item '>
    <img
      src={require(`../public/images/${props.mushroom.image}`)}
      alt="" height="80"
      width="60"
    />
    <h4>{"Name: " + props.mushroom.name}</h4>
    <p>{"Price:  $" + props.mushroom.price}.00</p>
    <button className="button button5" onClick={() =>props.addToGarden(props.mushroom)}>
      Add {props.mushroom.name} To Garden
    </button>
  </div>
)

export default MenuCard
