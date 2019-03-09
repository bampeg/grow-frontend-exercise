import React, { Component } from "react";
import axios from "axios";
import List from "./List";
import Details from "./Details";

export default class Main extends Component {
  state = {
    listBy: "Representative",
    stateSelected: "AL",
    person: {},
    results: [],
    USStates: [
      { name: "Alabama", abrev: "AL" },
      { name: "Alaska", abrev: "AK" },
      { name: "Arizona", abrev: "AZ" },
      { name: "Arkansas", abrev: "AR" },
      { name: "California", abrev: "CA" },
      { name: "Colorado", abrev: "CO" },
      { name: "Connecticut", abrev: "CT" },
      { name: "Delaware", abrev: "DE" },
      { name: "Florida", abrev: "FL" },
      { name: "Georgia", abrev: "GA" },
      { name: "Hawaii", abrev: "HI" },
      { name: "Idaho", abrev: "ID" },
      { name: "Illinois", abrev: "IL" },
      { name: "Indiana", abrev: "IN" },
      { name: "Iowa", abrev: "IA" },
      { name: "Kansas", abrev: "KS" },
      { name: "Kentucky", abrev: "KY" },
      { name: "Louisiana", abrev: "LA" },
      { name: "Maine", abrev: "ME" },
      { name: "Maryland", abrev: "MD" },
      { name: "Massachusetts", abrev: "MA" },
      { name: "Michigan", abrev: "MI" },
      { name: "Minnesota", abrev: "MN" },
      { name: "Mississippi", abrev: "MS" },
      { name: "Missouri", abrev: "MO" },
      { name: "Montana", abrev: "MT" },
      { name: "Nebraska", abrev: "NE" },
      { name: "Nevada", abrev: "NV" },
      { name: "New Hampshire", abrev: "NH" },
      { name: "New Jersey", abrev: "NJ" },
      { name: "New Mexico", abrev: "NM" },
      { name: "New York", abrev: "NY" },
      { name: "North Carolina", abrev: "NC" },
      { name: "North Dakota", abrev: "ND" },
      { name: "Ohio", abrev: "OH" },
      { name: "Oklahoma", abrev: "OK" },
      { name: "Oregon", abrev: "OR" },
      { name: "Pennsylvania", abrev: "PA" },
      { name: "Rhode Island", abrev: "RI" },
      { name: "South Carolina", abrev: "SC" },
      { name: "South Dakota", abrev: "SD" },
      { name: "Tennessee", abrev: "TN" },
      { name: "Texas", abrev: "TX" },
      { name: "Utah", abrev: "UT" },
      { name: "Vermont", abrev: "VT" },
      { name: "Virginia", abrev: "VA" },
      { name: "Washington", abrev: "WA" },
      { name: "West Virginia", abrev: "WV" },
      { name: "Wisconsin", abrev: "WI" },
      { name: "Wyoming", abrev: "WY" }
    ]
  };

  componentDidMount() {
    this.getList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { stateSelected, listBy, person } = this.state;
    if (
      prevState.listBy !== listBy ||
      prevState.stateSelected !== stateSelected ||
      prevState.person !== person
    ) {
      this.getList();
    }
  }

  getList = async () => {
    const { listBy, stateSelected } = this.state;
    const {
      data: { results }
    } = await axios.get(
      `http://localhost:3200/${listBy.toLocaleLowerCase()}s/${stateSelected}`
    );
    this.setState({ results });
  };

  buildList = () => {
    return this.state.results.map(person => {
      let { party, district, name } = person;
      if (party === "Republican") {
        party = "R";
      } else if (party === "Democrat") {
        party = "D";
      } else if (party === "Independent") {
        party = "I";
      }
      return (
        <div
          onClick={() => this.setState({ person })}
          key={district}
          className="list-item"
        >
          <p>{name}</p>
          <p>{party}</p>
        </div>
      );
    });
  };

  render() {
    const { listBy, USStates, person } = this.state;
    const stateOptions = USStates.map(({ name, abrev }) => {
      return (
        <option key={abrev} value={abrev}>
          {name}
        </option>
      );
    });
    return (
      <div>
        <div className="title">
          <h2>Who's My Representative?</h2>
        </div>
        <select onChange={e => this.setState({ listBy: e.target.value })}>
          <option value="Representative">Representative</option>
          <option value="Senator">Senator</option>
        </select>
        <select
          onChange={e => this.setState({ stateSelected: e.target.value })}
        >
          {stateOptions}
        </select>
        <div className="main-container">
          <List buildList={this.buildList} listBy={listBy} />
          <Details person={person} />
        </div>
      </div>
    );
  }
}
