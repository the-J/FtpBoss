/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';

import { colors } from '../settings';

const Settings = props => (
    <SettingsStyles>
        <Container>
            <Header as='h1'>
                Building settings here
            </Header>

            <Button
                basic
                color='green'
                as={Link}
                to={'/'}
                onClick={() => props.changePage()}
            >
                Save
            </Button>

            <Button
                basic
                color='red'
                as={Link}
                to={'/'}
                onClick={() => props.changePage()}
            >
                Cancel
            </Button>
        </Container>
    </SettingsStyles>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Settings);

const SettingsStyles = styled.div`
  margin-top:  20px;
  background: ${colors.background}
`;