import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import classes from "./search.module.css";

class Search extends Component {
  state = {
    results: [],
    searchItem: "",
    filteredResults: []
  };

  componentDidMount() {
    axios
      .get("https://api.openaq.org/v1/measurements?country=GB&limit=100")
      .then(res => {
        this.setState({ results: res.data.results });
      })
      .catch(err => console.log(err));
  }

  findMatches = () => {
    let wordToMatch = this.state.searchItem;
    let results = this.state.results;

    let filteredResults = results.filter(place => {
      // here we neeed to figure out if the city of state matches what was searced

      const regex = new RegExp(wordToMatch, "gi");
      return place.city.match(regex);
    });
    this.setState({ filteredResults });
  };

  handleChange = e => {
    const val = e.target.value;
    const newVal = val.charAt(0).toUpperCase() + val.slice(1);

    this.setState({ [e.target.name]: newVal }, () => {
      this.findMatches();
    });
  };

  render() {
    let matchArray;

    this.state.searchItem === ""
      ? (matchArray = null)
      : (matchArray = this.state.filteredResults.slice(0, 5).map(place => (
          <li key={place.coordinates.latitude}>
            <span>{place.city}</span>
          </li>
        )));

    return (
      <div>
        <h1>Compare your Air</h1>
        <h3>Compare the air quality between cities in the UK</h3>
        <h3>Select cities to compare using the search tool below.</h3>
        <TextField
          autoFocus={true}
          placeholder="Enter city name..."
          variant="outlined"
          onChange={this.handleChange}
          name="searchItem"
        />
        <div className={classes.suggestions}>{matchArray}</div>
      </div>
    );
  }
}

export default Search;
