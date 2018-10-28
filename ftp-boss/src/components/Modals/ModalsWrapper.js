/**
 * Created by juliusz.jakubowski@gmail.com on 26.10.18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Modal } from 'semantic-ui-react';

import CreateDirectory from './CreateDirectory';
import ConfirmDelete from './ConfirmDelete';
import Upload from './Upload';

const { ipcRenderer, remote } = window.require('electron');
const ipc = remote.getGlobal('ipc');


class ModalsWrapper extends Component {
    static propTypes = {
        showHideModal: PropTypes.func.isRequired,
        refreshFiles: PropTypes.func.isRequired,
        showModal: PropTypes.bool.isRequired,
        modal: PropTypes.string.isRequired,
        deleteDirOrFile: PropTypes.func.isRequired,
        fileToDelete: PropTypes.string.isRequired
    };

    constructor() {
        super();

        this.state = {
            newDirectoryName: '',
            filesToUpload: []
        };
    }

    componentDidMount() {
        ipcRenderer.on(ipc.CREATE_DIRECTORY_CB, this.props.refreshFiles);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(ipc.CREATE_DIRECTORY_CB, this.props.refreshFiles);
    }

    newDirectoryName = e => {
        const value = e.target.value;
        let newDirectoryName = this.state.newDirectoryName;

        if (value) newDirectoryName = value;
        else newDirectoryName = '';

        newDirectoryName.trim();
        this.setState({ newDirectoryName });
    };

    createDirectory = () => {
        const { showHideModal, currentPath } = this.props;
        const newDirectoryName = this.state.newDirectoryName;

        ipcRenderer.send(ipc.CREATE_DIRECTORY, { dirPath: currentPath.result, dirName: newDirectoryName });
        this.setState({ newDirectoryName: '' });
        showHideModal();
    };

    handleOnDrop = files => {
        if (!files.length) return console.log('no files droped');

        const filesToUpload = this.state.filesToUpload;

        for (let file of files) {
            console.log({file});
            files.push({
                name: file.name,
                path: file.path
            });
        }

        this.setState({ filesToUpload });

        console.log(files, filesToUpload);
    };

    removeFilesFromList = filename => console.log(filename);

    uploadFiles = () => console.log('upload files');

    render() {
        const {
            showHideModal,
            showModal,
            modal,
            currentPath,
            fileToDelete,
            deleteDirOrFile
        } = this.props;
        const { newDirectoryName } = this.state;

        if (!modal || modal === 'hide') return null;

        return (
            <Modal
                basic
                size='small'
                open={showModal}
                onClose={showHideModal}
            >
                {modal === 'createDirectory' &&
                <CreateDirectory
                    currentPath={currentPath}
                    showHideModal={showHideModal}
                    newDirectoryName={newDirectoryName}
                    setNewDirectoryName={e => this.newDirectoryName(e)}
                    createDirectory={e => this.createDirectory(e)}
                />}

                {modal === 'confirm' &&
                <ConfirmDelete
                    currentPath={currentPath}
                    showHideModal={showHideModal}
                    fileToDelete={fileToDelete}
                    deleteDirOrFile={name => deleteDirOrFile(name)}
                />}

                {modal === 'uploadFile' &&
                <Upload
                    showHideModal={showHideModal}
                    removeFile={name => this.removeFilesFromList(name)}
                    handdleOnDrop={e => this.handleOnDrop(e)}
                    uploadFiles={() => this.uploadFiles()}
                />}
            </Modal>
        );
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ModalsWrapper);