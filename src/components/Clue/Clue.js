/**
 * Clue View renders details passed from selected Question component
 */

import React, {Fragment} from 'react';
import './clue.scss';

class Clue extends React.Component {
  state = {
    showAnswer: false,
  };

  /**
   * Toggles between question & answer
   */
  toggleView = () => {
    const showAnswer = ! this.state.showAnswer;

    this.setState({
      showAnswer: showAnswer
    });

    this.displayText();
  };

  /**
   * Displays Question or Answer, depending on State
   */
  displayText() {
    if ( this.state.showAnswer ) {
      return (
        <Fragment>
          ANSWER:<br />
          { this.props.answer }
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          CLUE:<br />
          { this.props.question }
        </Fragment>
      )
    }
  }

  /**
   * Displays button text, based on State
   */
  displayToggleText = () => {
    const showAnswer = this.state.showAnswer;
    return ( showAnswer ) ? 'Display Clue' : 'Display Answer';
  };

  /**
   * Generates class name, based on State
   */
  displayClassName = () => {
    return this.props.show ? 'clue-view' : 'clue-view hide';
  };

  /**
   * displays modal content
   */
  displayContent = () => {
    if ( this.props.show ) {
      return (
        <Fragment>
          <div className="clues">
            { this.displayText() }
          </div>
          <div className="controls grid-x">
            <button onClick={ this.toggleView } className="button primary">{ this.displayToggleText() }</button>
            <button onClick={ this.props.close } className="button secondary">Done</button>
          </div>
        </Fragment>
      )
    }
  };

  render() {
    return (
      <div className={ this.displayClassName() }>
        { this.displayContent() }
      </div>
    )
  }
}

export default Clue;
