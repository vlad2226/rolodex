import "./App.css";
import React from "react";
import SearchBox from "./SearchBox";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchBox: "",
    };
    console.log("constructor with initial state");
    console.log(this.state.searchBox);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((res) => res.json())
      .then((data) =>
        this.setState(
          () => {
            return { monsters: data };
          },
          () => {}
        )
      )
      .catch((e) => console.error(`thats an error ${e}`));
    console.log("componentDidMount with Fetch");
  }

  render() {
    console.log("render");
    return (
      <div>
        <input
          type="search"
          placeholder="search monsters"
          onChange={() =>
            this.setState((e) => {
              return { searchBox: e.target.value };
            })
          }
        />
        <SearchBox monsters={this.state.searchBox} />
        {this.state.monsters.some((monster) => {
          return (
            <div key={monster.id}>
              <h1>
                {monster.name.toLowerCase() === this.state.searchBox.value}
              </h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
