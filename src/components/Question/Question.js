/**
 * Question component displays/stores passed data from Board
 */

import React from 'react';
import Clue from "../Clue/Clue";

class Question extends React.Component {
  state = {
    showClue: false,
    viewedClue: false
  };

  wasCardOpened = () => {
   return ( this.state.viewedClue ) ? 'hide value' : 'value';
  };

  /**
   * Opens Clue view for selected question
   */
  loadClue = () => {
    this.setState({
      showClue: true
    });
  };

  /**
   * Hides Clue view
   */
  hideClue = () => {
    this.setState({
      showClue: false,
      viewedClue: true
    });
  };

  render() {
    const { value, question, answer } = this.props.qprops;

    return (
      <div className="question">
        <div className={ this.wasCardOpened() } onClick={ this.loadClue }><span>$ { value }</span></div>
        <Clue question={ question } answer={ answer } show={ this.state.showClue } close={ this.hideClue } />
      </div>
    )
  }
}

export default Question;
