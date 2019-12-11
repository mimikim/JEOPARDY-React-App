/**
 * Main Application component
 * calls API, manages category IDs in State
 * passes stored Clues to Board component
 */

import React from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Board from './components/Board/Board';
import { generateRandomNumber } from "./helper";
import './App.scss';
import 'foundation-sites/dist/css/foundation.min.css';

class App extends React.Component {
  categoryRef = React.createRef();
  cluesRef = React.createRef();

  defaultCatNum = 5;
  defaultClueNum = 5;

  state = {
    round: 0,
    maxRounds: 6,
    numCategories: this.defaultCatNum,
    numClues: this.defaultClueNum,
    categoriesPerRound: [], // categories grouped by Round #
    storedOffsets: [], // stores all used RNG offsets to ensure no duplicate categories
    clues: {},
    openedClues: 0, // keeps track of # of opened clues,
    totalClues: 0
  };

  componentDidMount() {
    this.setBoard( this.state.numCategories );
  }

  /**
   * Assembles board, stores categories, offset used, & clues in each category
   * @param categoryCount : number of Categories to display
   */
  setBoard = ( categoryCount ) => {
    const storedOffsets = [...this.state.storedOffsets];

    // TODO: need better way to set max # limit for categories
    let offset = generateRandomNumber( 0, 18410 );

    // if generated number has already been called before, add 5 (or category count)
    if ( storedOffsets.includes( offset ) ) {
      offset = offset + categoryCount;
    }

    storedOffsets.push(offset);

    fetch( `http://jservice.io/api/categories/?count=${categoryCount}&offset=${offset}` )
      .then( resp => resp.json() )
      .then( data => {
        const ids = [];

        for ( const key of data ) {
          ids.push( key.id );
        }

        return ids;
      })
      .then( ids => {
        // grabbing clues within category IDs defined above
        const promises =  ids.map( ( elm, index ) => {
          return fetch( `http://jservice.io/api/category/?id=${elm}` )
            .then( resp => resp.json() )
            .then( data => {
              return data;
            })
        });

        return Promise.all( promises );
      })
      .then( promises => {
        const categoriesPerRound = [...this.state.categoriesPerRound];
        const maxNumClues = this.state.numClues;
        const catIDs = [];
        const questions = {};

        promises.forEach( ( elm, index ) => {
          // if # of clues in category exceed max # of clues, return slice starting at index 0
          // TODO: make this better
          const cluesArray = ( elm.clues.length > maxNumClues ) ? elm.clues.slice( 0, this.state.numClues ) : elm.clues;

          questions[elm.id] = {
            'category': elm.title,
            'clues': cluesArray
          };

          catIDs.push( elm.id );
        });

        // pushing this current Round's category IDs
        categoriesPerRound.push({
          'round': ( this.state.round + 1 ),
          'categories': catIDs
        });

        this.setState({
          round: ( this.state.round + 1 ),
          categoriesPerRound: categoriesPerRound,
          storedOffsets: storedOffsets,
          clues: questions,
          totalClues: this.calculateGrid()
        });
      })
      .catch( error => {
        console.log( 'setBoard():', error );
      });
  };

  /**
   * Calculates total # of clues on Board
   */
  calculateGrid() {
    return this.state.numCategories * this.state.numClues;
  }

  /**
   * Keeps track of opened clues
   */
  trackOpenedClues() {
    const currentClueCount = this.state.openedClues;
    this.setState({
      openedClues: currentClueCount + 1
    });
  }

  /**
   * Resets Board with new questions
   * grabs cat/clue num values, API calls, Round # remain the same
   */
  reset = e => {
    e.preventDefault();
    let confirmation = false;

    if ( this.state.round === this.state.maxRounds ) {
      window.alert( 'Maximum number of Rounds reached. Please refresh the page to replay JEOPARDY!' );
    } else {
      confirmation = window.confirm( 'Do you want to reset the JEOPARDY! board?' );
    }

    if ( confirmation ) {
      this.setState({
        numCategories: this.categoryRef.current.value,
        numClues: this.cluesRef.current.value,
        totalClues: this.calculateGrid()
      }, () => {
        this.setBoard( this.state.numCategories );
      })
    }
  };

  render() {
    return (
      <div className="jeopardy-app">
        <Header title="Simple JEOPARDY! App" />
        <main>
          <div>Round: { this.state.round }</div>
          <Board clues={ this.state.clues } />
          <form className="game-form" onSubmit={ this.reset }>
            <div className="grid-x grid-padding-x">
              <div className="small-6 cell">
                <label>
                  Number of Categories to display
                  <input type="number" min="1" max="10" defaultValue={ this.defaultCatNum } required ref={ this.categoryRef } />
                </label>
              </div>
              <div className="small-6 cell">
                <label>
                  Number of Clues to display in each Category
                  <input type="number" min="1" max="10" defaultValue={ this.defaultClueNum } required ref={ this.cluesRef } />
                </label>
              </div>
              <div className="small-12 cell text-center">
                <button className="button expanded" onClick={ this.reset }>Reset Game Board</button>
              </div>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    )
  }
}

export default App;
