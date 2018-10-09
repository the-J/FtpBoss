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
        ipcRenderer.on(ipc.SEND_TO_RENDERER, this.directoryList);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(ipc.SEND_TO_RENDERER, this.directoryList);
    }

    testAction = () => this.props.testAction();

    connectToFtp = () => ipcRenderer.send(ipc.CONNECT_FTP);

    gotoDir = ( dirName ) => ipcRenderer.send(ipc.GO_TO_DIR, dirName);

    downloadFile = () => console.log('download file');

    directoryList = ( event, list ) => this.setState({ list });

    render() {
        const { list } = this.state;

        return (
            <AppStyles>
                <Container>
                    <Header as='h1'>
                        App under construction
                    </Header>

                    {/*{JSON.stringify(this.props, undefined, 2)}*/}


                    <pre>
                        {
                            list.length ?
                                list.map(( dir, i ) => (
                                    <Button
                                        key={i}
                                        as={'p'}
                                        onClick={() => this.gotoDir(dir.name)}
                                    >
                                        {dir.name}
                                    </Button>
                                )) : 'emty dir'
                        }</pre>

                    <Button
                        basic
                        onClick={this.connectToFtp}
                    >
                        CONNECT FTP
                    </Button>

                    {/*<Button onClick={this.gotoDir}>*/}
                    {/*DIR GLITCH*/}
                    {/*</Button>*/}

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