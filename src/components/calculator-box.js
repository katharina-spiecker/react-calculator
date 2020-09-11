import React, { Component } from "react";
import Display from "./display";
import "../App.css";

class Calculator extends Component {
  state = {
    value: 0,
    isResult: false,
  };

  displayInnerText = (event) => {
    //if current value is zero or the from past calculations: replace value
    if (this.state.value == 0 || this.state.isResult) {
      this.setState({
        value: event.target.innerText,
        isResult: false,
      });
    } else {
      this.setState({
        value: this.state.value + event.target.innerText,
      });
    }
  };

  addOperator = (event) => {
    //if the last character is an operator replace it
    // 5 *- 5 -> -5
    //if last value is operator and new operator is not "-" then replace old with new one
    if (this.state.isResult) {
      this.setState({
        value: this.state.value + event.target.innerText,
        isResult: false,
      });
    } else if (
      /[-+/x]/.test(this.state.value[this.state.value.length - 2]) &&
      /-/.test(this.state.value[this.state.value.length - 1])
    ) {
      let newVal =
        this.state.value.slice(0, this.state.value.length - 2) +
        event.target.innerText;
      this.setState({
        value: newVal,
      });
    } else if (
      /[-+/x]/.test(this.state.value[this.state.value.length - 1]) &&
      event.target.innerText !== "-"
    ) {
      let newVal =
        this.state.value.slice(0, this.state.value.length - 1) +
        event.target.innerText;
      this.setState({
        value: newVal,
      });
    } else {
      this.displayInnerText(event);
    }
  };

  addDecimal = (event) => {
    var dot = event.target.innerText;
    let singleNumberArr = this.state.value.split(/[-+/x]/);
    //only check last number in number array
    if (/\./.test(singleNumberArr[singleNumberArr.length - 1])) {
      return;
    } else {
      this.setState({
        value: this.state.value + dot,
      });
    }
  };

  clearNumber = () => {
    this.setState({
      value: 0,
    });
  };

  calculate = () => {
    var numbersArr;
    let value = this.state.value;
    //if two operators are next to each other and the second one is a minus, keep the minus
    let regex = /[-+/x]-/;
    if (regex.test(value)) {
      numbersArr = value.split(/[+/x]/);
    } else {
      numbersArr = value.split(/[-+/x]/);
    }
    // convert str to number
    numbersArr = numbersArr.map((str) => Number(str));

    var operatorsArr = value.match(/[-+/x]/g);

    //store first number as result
    var result = numbersArr[0];

    for (let i = 1; i < numbersArr.length; i++) {
      switch (operatorsArr[i - 1]) {
        case "+":
          result += numbersArr[i];
          break;
        case "-":
          result -= numbersArr[i];
          break;
        case "x":
          result *= numbersArr[i];
          break;
        case "/":
          result /= numbersArr[i];
          break;
      }
    }

    this.setState({
      value: result,
      isResult: true,
    });
  };

  render() {
    return (
      <div id="calculator">
        <Display value={this.state.value} />

        <div id="key-container">
          <button id="clear" onClick={this.clearNumber}>
            AC
          </button>
          <button id="divide" onClick={this.addOperator}>
            /
          </button>
          <button id="multiply" onClick={this.addOperator}>
            x
          </button>
          <button id="seven" onClick={this.displayInnerText}>
            7
          </button>
          <button id="eight" onClick={this.displayInnerText}>
            8
          </button>
          <button id="nine" onClick={this.displayInnerText}>
            9
          </button>
          <button id="subtract" onClick={this.addOperator}>
            -
          </button>
          <button id="four" onClick={this.displayInnerText}>
            4
          </button>
          <button id="five" onClick={this.displayInnerText}>
            5
          </button>
          <button id="six" onClick={this.displayInnerText}>
            6
          </button>
          <button id="add" onClick={this.addOperator}>
            +
          </button>
          <button id="one" onClick={this.displayInnerText}>
            1
          </button>
          <button id="two" onClick={this.displayInnerText}>
            2
          </button>
          <button id="three" onClick={this.displayInnerText}>
            3
          </button>
          <button id="equals" onClick={this.calculate}>
            =
          </button>
          <button id="zero" onClick={this.displayInnerText}>
            0
          </button>
          <button id="decimal" onClick={this.addDecimal}>
            .
          </button>
        </div>
      </div>
    );
  }
}

export default Calculator;
