/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import { colors } from '../settings';

import { testAction } from '../store/actions/test';

import { CONNECT_FTP, SEND_TO_RENDERER } from '../utils/const';

const { ipcRenderer } = window.require('electron');

class App extends Component {
    constructor() {
        super();

        this.state = {
            list: []
        };
    }

    componentDidMount() {
        ipcRenderer.on(SEND_TO_RENDERER, this.dataFromMain);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(SEND_TO_RENDERER, this.dataFromMain);
    }

    testAction = () => this.props.testAction();

    connectToFtp = () => ipcRenderer.send(CONNECT_FTP);

    dataFromMain = ( event, data ) => {
        console.log({ event }, { data });
        this.setState({ list: data });
    };

    render() {
        const { list } = this.state;

        return (
            <AppStyles>
                <Container>
                    <Header as='h1'>
                        App under construction
                    </Header>
                    <pre>{list.length ?
                        list.map(dir => <p>{dir.name}, {dir.date}</p>) : 'emty dir'}</pre>

                    <Button onClick={this.connectToFtp}>
                        FTP
                    </Button>

                    <Button
                        basic
                        as={Link}
                        to='/settings'
                    >
                        <Icon name='cog' />Settings
                    </Button>
                </Container>
            </AppStyles>
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

const AppStyles = styled.div`
  margin-top:  20px;
  background: ${colors.background}
`;