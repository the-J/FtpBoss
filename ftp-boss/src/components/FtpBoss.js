/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Container } from 'semantic-ui-react';

import { colors } from '../settings';

import FilesList from './FilesList';

import { currentPath } from '../store/actions/currentPath';

const { ipcRenderer, remote } = window.require('electron');

const ipc = remote.getGlobal('ipc');

class FtpBoss extends Component {
    constructor() {
        super();

        this.state = {
            list: [],
            connectingFtp: false
        };
    }

    componentDidMount() {
        ipcRenderer.on(ipc.SEND_TO_RENDERER, this.directoryList);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(ipc.SEND_TO_RENDERER, this.directoryList);
    }

    getDirectoryFilesList = ( dirName = '/' ) => {
        this.props.currentPathAction(dirName);
        this.setState({ connectingFtp: true });
        ipcRenderer.send(ipc.LIST_DIRECTORY_FILES, dirName);
    };

    downloadFile = () => console.log('download file');

    directoryList = ( event, list ) => this.setState({ list, connectingFtp: false });

    render() {
        const { list, connectingFtp } = this.state;

        return (
            <FtpBossStyles>
                <Container>
                    <Button
                        basic
                        loading={connectingFtp}
                        labelPosition='right'
                        icon='linkify'
                        content='CONNECT'
                        onClick={() => this.getDirectoryFilesList()}
                    />

                    <Button
                        basic
                        as={Link}
                        to='/ftp'
                        labelPosition='right'
                        icon='setting'
                        content='FTP SETTINGS'
                    />

                    {
                        list && !!list.length &&
                        <FilesList
                            list={list}
                            goToDirectory={dir => this.getDirectoryFilesList(dir)}
                            download={fileName => this.downloadFile(fileName)}
                        />
                    }
                </Container>
            </FtpBossStyles>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    currentPathAction:  path  => dispatch(currentPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(FtpBoss);

const FtpBossStyles = styled.div`
  margin-top:  20px;
  background: ${colors.background}
`;