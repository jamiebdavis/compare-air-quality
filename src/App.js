import React, { Component } from "react";
import "./App.css";
import Container from "./components/container/container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>Air Quality Tech Test</h3>
        <Container />
      </div>
    );
  }
}

export default App;
