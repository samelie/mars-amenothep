import './app.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {
  static propTypes = {
    // own props
    children: PropTypes.node.isRequired,
    // router props
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { loadAlhambra, loadBodymovin, loadSequence } = this.props;
  }

  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => ({
}), {
})(App);
