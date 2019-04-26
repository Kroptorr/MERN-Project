import React from "react";

const Item = (props) =>
	
	<div id="Item">
		<button onClick={() => props.delete(props.item._id)} id="deleteButton">X</button>
		{props.text}
		{console.log(props.item._id)}
	</div>;

export default Item;