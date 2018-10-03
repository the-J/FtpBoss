/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import React, { Fragment } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Settings = props => (
    <Fragment>
        Building settings here

        <br />

        <button
            onClick={() => props.changePage()}
        >
            Go back through redux
        </button>
    </Fragment>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Settings);