import axios from "axios";
import React, {Component} from "react";
import uniqid from "uniqid";
import "./App.css";
import Item from "./Items";

class App extends Component {
	
	deleteItem = (id) => {
		axios.get("http://localhost:4000/local/delete/" + id)
			.then(console.log("Deleted"))
			.catch(err => console.log(err));
		axios.get("http://localhost:4000/local/")
			.then(response => {
				this.setState({items: response.data});
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	
	textChange = (e) => {
		this.setState({
			itemText: e.target.value
		});
	};
	
	addItem = () => {
		const {itemText} = this.state;
		const newItem = {
			item_Text: itemText
		};
		
		if (itemText !== "") {
			
			axios.post("http://localhost:4000/local/add", newItem)
				.then(res => console.log(res.data));
			axios.get("http://localhost:4000/local/")
				.then(response => {
					this.setState({items: response.data});
				})
				.catch(function (error) {
					console.log(error);
				});
		}
		this.setState({
			itemText: ""
		});
	};
	
	state = {
		items: [],
		itemText: ""
	};
	
	componentDidMount () {
		axios.get("http://localhost:4000/local/")
			.then(response => {
				this.setState({items: response.data});
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	render () {
		let {itemText, items} = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<div>
						<input type="text" onChange={this.textChange} value={itemText}/>
						<button id="AddItem" onClick={this.addItem}>+</button>
					</div>
					<div id="ItemsContainer">
						{items.map((item) => {
								return (
									<Item
										item={item}
										text={item.item_Text}
										key={uniqid()}
										delete={this.deleteItem}/>
								);
							}
						)}
					</div>
				</header>
			</div>
		);
	}
}

export default App;
