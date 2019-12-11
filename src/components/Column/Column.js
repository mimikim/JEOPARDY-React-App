/**
 * Creates a column, based on passed props
 */

import React from 'react';
import './column.scss';
import Question from '../Question/Question';

class Column extends React.Component {

  componentDidMount() {
    this.assignValues();
  }

  /**
   * Assigns value to clues that are missing values
   */
  assignValues = () => {

  };

  render() {
    const { category, clues } = this.props;

    return (
      <div className="column">
        <div className="category">{category}</div>
        { Object.keys( clues ).map( index =>
          <Question key={clues[index].id} qprops={ clues[index] } />
        ) }
      </div>
    );
  }
}

export default Column;
