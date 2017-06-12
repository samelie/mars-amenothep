import './home-page.scss';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Mars from '../../components/mars/mars';

class HomePage extends Component {

  static propTypes = {
    browser: PropTypes.object.isRequired
  };


  render() {
    const { browser } = this.props;
    return (
      <div className="o-page">
        <Mars/>
      </div>
    );
  }
}


export default connect(({ browser }) => ({
  browser,
}))(HomePage);
