import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name1: "",
      name2: "",
      answer: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  calculateRelationship = () => {
    const { name1, name2 } = this.state;

    // Check for blank input
    if (name1.trim() === "" || name2.trim() === "") {
      this.setState({
        answer: "Please Enter valid input",
      });
      return;
    }

    const arr1 = name1.split("");
    const arr2 = name2.split("");

    const used = new Array(arr2.length).fill(false);

    let remaining1 = 0;
    let remaining2 = 0;

    // Remove matching characters
    for (let i = 0; i < arr1.length; i++) {
      let found = false;

      for (let j = 0; j < arr2.length; j++) {
        if (!used[j] && arr1[i] === arr2[j]) {
          used[j] = true;
          found = true;
          break;
        }
      }

      if (!found) {
        remaining1++;
      }
    }

    // Count unmatched characters in name2
    for (let j = 0; j < arr2.length; j++) {
      if (!used[j]) {
        remaining2++;
      }
    }

    const total = remaining1 + remaining2;
    const result = total % 6;

    let relationship;

    switch (result) {
      case 1:
        relationship = "Friends";
        break;
      case 2:
        relationship = "Love";
        break;
      case 3:
        relationship = "Affection";
        break;
      case 4:
        relationship = "Marriage";
        break;
      case 5:
        relationship = "Enemy";
        break;
      case 0:
        relationship = "Siblings";
        break;
      default:
        relationship = "Please Enter valid input";
    }

    this.setState({
      answer: relationship,
    });
  };

  clearData = () => {
    this.setState({
      name1: "",
      name2: "",
      answer: "",
    });
  };

  render() {
    const { name1, name2, answer } = this.state;

    return (
      <div id="main">
        {/* Do not remove the main div */}

        <input
          type="text"
          data-testid="input1"
          name="name1"
          value={name1}
          onChange={this.handleChange}
        />

        <input
          type="text"
          data-testid="input2"
          name="name2"
          value={name2}
          onChange={this.handleChange}
        />

        <button
          type="button"
          data-testid="calculate_relationship"
          name="calculate_relationship"
          onClick={this.calculateRelationship}
        >
          Calculate Relationship
        </button>

        <button
          type="button"
          data-testid="clear"
          name="clear"
          onClick={this.clearData}
        >
          Clear
        </button>

        <h3 data-testid="answer">
          {answer}
        </h3>
      </div>
    );
  }
}

export default App;