import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class Search extends Component {
  state = {
    results: [],
    searchItem: "",
    filteredResults: [],
    imageCardOne: {
      city: "",
      location: "",
      parameter: "",
      unit: "",
      value: ""
    },
    imageCardTwo: {}
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

  handleClick = e => {
    console.log(e.target);
    /*     this.setState({
      imageCardOne: {
        city: "",
        location: "",
        parameter: "",
        unit: "",
        value: ""
      }
    }); */
  };

  render() {
    let matchArray;

    this.state.searchItem === ""
      ? (matchArray = null)
      : (matchArray = this.state.filteredResults.slice(0, 5).map(place => (
          <div key={place.coordinates.latitude}>
            <br />
            <Paper elevation={1} onClick={this.handleClick}>
              <Typography component="p">{place.city}</Typography>
            </Paper>
            <br />
          </div>
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
        <div>{matchArray}</div>
      </div>
    );
  }
}

export default Search;
