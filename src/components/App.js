import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Todos from './Todos';
import Goals from './Goals';

import { handleInitialData } from '../actions/shared';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <div>
                {this.props.loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <Fragment>
                        <Todos />
                        <Goals />
                    </Fragment>
                )}
            </div>
        );
    }
}

export default connect(state => ({
    loading: state.loading,
}))(App);
