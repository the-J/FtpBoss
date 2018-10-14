/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Divider } from 'semantic-ui-react';
import { colors } from '../settings';

import { currentPath } from '../store/actions/currentPath';

import { TopButtons } from './TopButtons';
import FilesListWrapper from './FilesListWrapper';

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

    /**
     *
     * @param {String} [dirName]
     * @param {String} [direction='forward'] - 'home', backwards'
     */
    goToDirectory = ( dirName = '', direction = 'forward' ) => {
        if (direction !== 'forward' && direction !== 'backwards' && direction !== 'home') {
            return console.error('set error for wrong directory direction');
        }

        let currentPath = this.props.currentPath.result;

        if (currentPath) {
            if (direction === 'forward') {
                dirName = currentPath === dirName
                    ? dirName
                    : currentPath + '/' + dirName;
            }
            else if (direction === 'backwards') {
                dirName = currentPath.slice(0, currentPath.match(/\/(?!.*\/)/).index);
            }
            else if (direction === 'home') {
                dirName = '';
            }
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
                    goToDirectory={( dirName, direction ) => this.goToDirectory(dirName, direction)}
                />

                <Divider />

                <FilesListWrapper
                    list={list}
                    goToDirectory={dir => this.goToDirectory(dir)}
                    download={fileName => this.downloadFile(fileName)}
                />
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