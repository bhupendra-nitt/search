import React from 'react';
import './_search.scss';
import Dropdown from './Dropdown';
import { searchTerm } from '../utils/helper';
import { sanitizeResult } from './helper';
import Card from './BookCard/Card';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      frequency: 5,
      selectedList: [],
      searchResult: [],
      searchQuery: null
    }
  }

  handleSelection = (e) => {
    console.log(e);
    this.setState({ selectedList: this.state.selectedList.concat(e) })
  }

  handleInput = (input) => {
    this.setState({searchQuery: input})
  }

  handleSearch = () => {
    const { searchQuery, frequency } = this.state;
    const result =  searchTerm(searchQuery, frequency);
    const sanitizedResult = sanitizeResult(result);
    this.setState({searchResult: sanitizedResult})
  }

  render () {
    return <div className="search">
      <div className="search__selection-box">
        <Dropdown 
          result={this.state.searchResult}
          handleSelection={this.handleSelection}
          handleInput={this.handleInput}
        />
      </div>
      <input
        className="search__frequency"
        placeholder="Frequency"
        onChange={e => this.setState({frequency: e.target.value})}
        type="number"
      />
      <button
        className="search__action"
        onClick={this.handleSearch}
      >
        Search
      </button>
      <div className="search__list">
        {
          this.state.selectedList.map((ele, index) => {
          return (
            <Card 
              key={ele.id}
              author={ele.author}
              summary={ele.summary}
              title={ele.title}
            />)
          })
        }
      </div>
    </div>
  }
}

export default Search;
