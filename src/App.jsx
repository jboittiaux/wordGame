import React from "react";
import "./App.css";
import words from "./dico";
import * as moment from "moment";

class App extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      currentWord: words[0],
      hasError: null,
      inputWord: "",
      intervalId: null,
      timer: 0,
      started: false,
    };

    this.start = this.start.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
  }

  componentWillUnmount() {
    this.stop();
  }

  render() {
    const {
      currentIndex,
      currentWord,
      hasError,
      inputWord,
      started,
    } = this.state;
    const { nbWords } = this.props;

    const inputClass = hasError === null ? "" :
      hasError === true ? "hasError" : "isOk";

    return (
      <div className="wrapper">
        <div className="container">
          { started ? (<>
            <span className="counter">{currentIndex + 1}/{nbWords}</span>
            <div className="wordPreview">{currentWord}</div>
            <form onSubmit={this.onSubmit}>
              <input type="text" value={inputWord} onChange={this.handleWordChange} className={inputClass} />
            </form>
            <div className="graph"></div>
            { this.renderTimer() }
          </>) : (<>
            <button onClick={this.start} className="startButton" autoFocus>Press enter to start</button>
          </>) }
        </div>
      </div>
    );
  }

  renderTimer = () => {
    const { timer } = this.state;
    return (
      <div className="timer">
        { moment().startOf("day").seconds(timer).format("HH:mm:ss") }
      </div>
    );
  }

  start = () => {
    const intervalId = setInterval(this.increaseTimer, 1000);
    this.setState({
      intervalId,
      started: true,
    });
  }

  stop = () => {
    const { intervalId } = this.state;

    clearInterval(intervalId);
  }

  handleWordChange = (e) => {
    this.setState({ inputWord: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { currentWord, inputWord } = this.state;

    if (currentWord === inputWord) {
      this.setState({ hasError: false });
      this.gotoNext();
    } else {
      this.setState({ hasError: true });
    }
  }

  gotoNext = () => {
    const { currentIndex } = this.state;
    const newIndex = currentIndex +1;

    this.setState({
      currentIndex: newIndex,
      currentWord: words[newIndex],
      hasError: null,
      inputWord: "",
    });
  }

  increaseTimer = () => {
    const { timer } = this.state;

    this.setState({ timer: timer +1 });
  }
}

App.defaultProps = {
  nbWords: words.length,
};

export default App;
