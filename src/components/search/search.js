import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

class Search extends Component {
  state = {
    results: [],
    searchItem: ""
  };

  handleChange = e => {
    const val = e.target.value;
    const newVal = val.charAt(0).toUpperCase() + val.slice(1);

    if (val === "") {
      this.setState({ results: [] });
    } else {
      this.setState({ [e.target.name]: newVal }, () => {
        axios
          .get(
            `https://api.openaq.org/v1/measurements?country=GB&limit=10&city=${newVal}`
          )
          .then(res => {
            this.setState({ results: res.data.results });
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  };

  render() {
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
      </div>
    );
  }
}

export default Search;
