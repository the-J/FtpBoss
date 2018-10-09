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

const { ipcRenderer, remote } = window.require('electron');

const ipc = remote.getGlobal('ipc');

class App extends Component {
    constructor() {
        super();

        this.state = {
            list: []
        };
    }

    componentDidMount() {
        ipcRenderer.on(ipc.SEND_TO_RENDERER, this.dataFromMain);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(ipc.SEND_TO_RENDERER, this.dataFromMain);
    }

    testAction = () => this.props.testAction();

    connectToFtp = () => ipcRenderer.send(ipc.CONNECT_FTP);

    dataFromMain = ( event, data ) => this.setState({ list: data });

    render() {
        const { list } = this.state;

        return (
            <AppStyles>
                <Container>
                    <Header as='h1'>
                        App under construction
                    </Header>

                    {JSON.stringify(this.props, undefined, 2)}


                    <pre>
                        {
                            list.length ?
                                list.map(( dir, i ) => (
                                    <p key={i}>
                                        {dir.name}, {dir.date}
                                    </p>
                                )) : 'emty dir'
                        }</pre>

                    <Button onClick={this.connectToFtp}>
                        CONNECT FTP
                    </Button>

                    <Button
                        basic
                        as={Link}
                        to='/ftp'
                    >
                        <Icon name='server' />FTP SETTINGS
                    </Button>

                    {/*<Button*/}
                    {/*basic*/}
                    {/*as={Link}*/}
                    {/*to='/settings'*/}
                    {/*>*/}
                    {/*<Icon name='cog' />SETTINGS*/}
                    {/*</Button>*/}
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