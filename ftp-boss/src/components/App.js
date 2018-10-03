/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import React, { Component, Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Settings from './Settings';

import { testAction } from '../store/actions/test';

class App extends Component {
    testAction = ( event ) => {
        this.props.testAction();
    };

    render() {
        return (
            <Fragment>
                <header>
                    <Link to="/settings">Settings</Link>
                </header>

                <pre>{JSON.stringify(this.props)}</pre>

                <button onClick={this.testAction}>Test redux action</button>

                <main>
                    <Route exact path="/settings" component={Settings} />
                </main>

                <div>App under construction</div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    testAction: () => dispatch(testAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
