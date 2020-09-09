import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  onInputChange = (event) => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = (event) => {
    // This prevents form from being submitted
    event.preventDefault();

    // Fetch weather forecast for specified city
    this.props.fetchWeather(this.state.term);
    this.setState({ term: '' });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
          placeholder="Get a five-day weather forecast of a Canadian city"
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">
            Search
          </button>
        </span>
      </form>
    );
  }
}

// Weather data returned here ends up as a prop in the SearchBar container
function mapDispatchToProps(dispatch) {
  // Whenever "fetchWeather()" action is called and result is passed to all reducers.
  // However, in this case the Redux Middleware resolves the Action as a Promise and
  // waits for Promise to be resolved before forwarding the Response to the Reducers.
  return bindActionCreators({ fetchWeather }, dispatch);
}

// Promote SearchBar from a component to a container
export default connect(null, mapDispatchToProps)(SearchBar);
