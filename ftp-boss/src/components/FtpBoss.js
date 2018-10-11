/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Divider } from 'semantic-ui-react';
import { colors } from '../settings';

import FilesList from './FilesList';
import { TopButtons } from './TopButtons';

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
        ipcRenderer.on(ipc.SEND_TO_RENDERER, this.setDirectoryFilesList);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(ipc.SEND_TO_RENDERER, this.setDirectoryFilesList);
    }

    goOneDirectoryBack = () => {
        let currentPath = this.props.currentPath.result;

        if (currentPath !== '/') {
            // currentPath = currentPath.lastIndexOf('/');
            console.log(currentPath.lastIndexOf('/'));
            currentPath = currentPath.substr(0, currentPath.lastIndexOf("/"))
            // currentPath.splice(currentPath.length, 1);
        }

        console.log({ currentPath });
        this.goToDirectory(currentPath);
    };

    goToDirectory = ( dirName = '/' ) => {
        const currentPath = this.props.currentPath.result;
        if (dirName !== '/' && dirName !== currentPath) {
            dirName = currentPath.concat(dirName + '/');
        }

        this.props.currentPathAction(dirName);
        this.setState({ connectingFtp: true });
        this.getDirectoryFilesList(dirName);
    };

    getDirectoryFilesList = ( dirName = '/' ) => {
        ipcRenderer.send(ipc.LIST_DIRECTORY_FILES, dirName);
    };

    setDirectoryFilesList = ( event, list ) => this.setState({ list, connectingFtp: false });

    downloadFile = () => console.log('download file');

    render() {
        const { list, connectingFtp } = this.state;
        const { currentPath } = this.props;

        return (
            <FtpBossStyles>
                <TopButtons
                    connectingFtp={connectingFtp}
                    currentPath={currentPath}
                    goToDirectory={() => this.goToDirectory()}
                    goOneDirectoryBack={() => this.goOneDirectoryBack()}
                />

                <Divider />

                {
                    list && !!list.length &&
                    <FilesList
                        list={list}
                        goToDirectory={dir => this.goToDirectory(dir)}
                        download={fileName => this.downloadFile(fileName)}
                    />
                }
            </FtpBossStyles>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    currentPathAction: path => dispatch(currentPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(FtpBoss);

const FtpBossStyles = styled.div`
  margin-top:  20px;
  background: ${colors.background};
`;