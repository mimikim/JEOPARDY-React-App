/**
 * Loads Jeopardy board
 */

import React, {Fragment} from 'react';
import './board.scss';
import Column from '../Column/Column';

class Board extends React.Component {

  render() {
    const clues = this.props.clues;
    return (
      <Fragment>
        <div className="board">
          <div className="categories grid-x">
            { Object.keys( clues ).map( key =>
              <Column key={key} category={ clues[key].category } clues={ clues[key].clues } />
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Board;
