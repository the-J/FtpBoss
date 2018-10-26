/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Divider } from 'semantic-ui-react';

import { colors } from '../settings';

import { currentPath } from '../store/actions/currentPath';
import { settings } from '../store/actions/settings';

import FilesListWrapper from './FilesList/FilesListWrapper';
import ModalsWrapper from './Modals/ModalsWrapper';
import { TopButtons } from './TopButtons';

const { ipcRenderer, remote } = window.require('electron');
const ipc = remote.getGlobal('ipc');

class FtpBoss extends Component {
    constructor() {
        super();

        this.state = {
            list: [],
            connectingFtp: false,
            showUploadModal: false,
            type: 'file'
        };
    }

    componentDidMount() {
        ipcRenderer.on(ipc.SEND_LIST, this.setDirectoryFilesList);
        ipcRenderer.on(ipc.SEND_SERVER_PARAMS, this.refreshFilesList);
        ipcRenderer.on(ipc.SEND_SETTINGS_ON_LOAD, ( event, serverParams ) => {
            if (serverParams && Object.values(serverParams).length) {
                this.props.setSettingsAction(serverParams);
                this.refreshFilesList();
            }
        });

        ipcRenderer.on(ipc.REMOVE_DIR_OR_FILE_CB, this.refreshFilesList);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(ipc.SEND_LIST, this.setDirectoryFilesList);
        ipcRenderer.removeListener(ipc.SEND_SERVER_PARAMS, this.refreshFilesList);
        ipcRenderer.removeListener(ipc.SEND_SETTINGS_ON_LOAD, this.refreshFilesList);
        ipcRenderer.on(ipc.REMOVE_DIR_OR_FILE_CB, this.refreshFilesList);
    }

    setDirectoryFilesList = ( event, list ) => this.setState({ list, connectingFtp: false });

    refreshFilesList = () => this.goToDirectory(this.props.currentPath.result);

    getDirectoryFilesList = ( dirName = '/' ) => ipcRenderer.send(ipc.GET_DIRECTORY_FILES, dirName);

    showHideUploadModal = type => {
        type
            ? this.setState({ showUploadModal: !this.state.showUploadModal, type })
            : this.setState({ showUploadModal: !this.state.showUploadModal });
    };

    downloadFile = fileName => ipcRenderer.send(ipc.DOWNLOAD, {
        dirPath: this.props.currentPath.result,
        fileName: fileName
    });

    deleteDirOrFile = name => {
        this.setState({ connectingFtp: true });
        ipcRenderer.send(ipc.REMOVE_DIR_OR_FILE, { dirPath: this.props.currentPath.result, dirOrFileName: name });
    };

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
                const slashIndex = currentPath.match(/\/(?!.*\/)/)
                    ? currentPath.match(/\/(?!.*\/)/).index
                    : undefined;

                if (slashIndex) {
                    dirName = currentPath.slice(0, currentPath.match(/\/(?!.*\/)/).index);
                }
            }
            else if (direction === 'home') {
                dirName = '';
            }
        }

        this.props.currentPathAction(dirName);
        this.setState({ connectingFtp: true });
        this.getDirectoryFilesList(dirName);
    };

    render() {
        const { list, connectingFtp, showUploadModal, type } = this.state;
        const { currentPath } = this.props;

        return (
            <FtpBossStyles>
                <ModalsWrapper
                    type={type}
                    showUploadModal={showUploadModal}
                    showHideModal={() => this.showHideUploadModal()}
                    refreshFiles={() => this.refreshFilesList()}
                />

                <TopButtons
                    connectingFtp={connectingFtp}
                    currentPath={currentPath}
                    goToDirectory={( dirName, direction ) => this.goToDirectory(dirName, direction)}
                    uploadModal={type => this.showHideUploadModal(type)}
                />

                {/*<pre>*/}
                {/*{JSON.stringify(this.props, null, '   ')}*/}
                {/*</pre>*/}
                <Divider />

                <FilesListWrapper
                    currentPath={currentPath}
                    list={list}
                    goToDirectory={dir => this.goToDirectory(dir)}
                    deleteDirOrFile={name => this.deleteDirOrFile(name)}
                    downloadFile={fileName => this.downloadFile(fileName)}
                />
            </FtpBossStyles>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    currentPathAction: path => dispatch(currentPath(path)),
    setSettingsAction: serverParams => dispatch(settings(serverParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(FtpBoss);

const FtpBossStyles = styled.div`
  margin-top:  20px;
  background: ${colors.background};
`;