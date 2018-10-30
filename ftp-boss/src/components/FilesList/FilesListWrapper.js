/**
 * Created by juliusz.jakubowski@gmail.com on 14.10.18.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import FilesList from './FilesList';
import UploadFilesList from './UploadFilesList';

const dropzoneStyles = {
    position: 'relative',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 0,
    padding: 0,
    background: 'rgba(0,0,0,0)',
    color: '#2f3133'
};

const dropzoneActiveStyles = {
    position: 'absolute',
    borderRadius: '1em',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: '-1em',
    background: 'rgba(0,0,0,0.5)',
    color: '#2f3133'
};

const dropzoneRef = React.createRef();

// @todo handling no table situation
class FilesListWrapper extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        goToDirectory: PropTypes.func.isRequired,
        downloadFile: PropTypes.func.isRequired,
        currentPath: PropTypes.object.isRequired,
        deleteFile: PropTypes.func.isRequired,
        openFileDialog: PropTypes.bool.isRequired,
        openCloseFileUploadDialog: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            dropzoneActive: false,
            filesToUpload: [],
            openFileDialog: false
        };
    }

    onDragEnter = () => this.setState({ dropzoneActive: true });

    onDragLeave = () => this.setState({ dropzoneActive: false });

    onDrop = ( accepted, rejected ) => {
        if (!accepted.length) return console.log('no files dropped');

        const filesToUpload = this.state.filesToUpload;

        for (let file of accepted) {
            filesToUpload.push({
                name: file.name,
                path: file.path
            });
        }

        this.setState({ filesToUpload });
        this.onDragLeave();
    };

    removeFilesFromList = fileName => {
        let filesToUpload = this.state.filesToUpload;

        if (!fileName) filesToUpload = [];

        this.setState({ filesToUpload });
    };

    uploadFiles = () => console.log('upload files');

    render() {
        const {
            list,
            goToDirectory,
            downloadFile,
            currentPath,
            deleteFile,
            openFileDialog,
            openCloseFileUploadDialog
        } = this.props;

        const {
            dropzoneActive,
            filesToUpload
        } = this.state;

        return (
            <Container>
                <Dropzone
                    disableClick
                    style={dropzoneStyles}
                    ref={dropzoneRef}
                    onDrop={e => this.onDrop(e)}
                    onDragEnter={() => this.onDragEnter()}
                    onDragLeave={() => this.onDragLeave()}
                    onFileDialogCancel={() => openCloseFileUploadDialog()}
                >
                    {dropzoneActive && <span style={dropzoneActiveStyles}/>}
                    {openFileDialog ? dropzoneRef.current.open() : null}

                    {
                        dropzoneActive && <span style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            padding: '2.5em 0',
                            background: 'rgba(0,0,0,0.5)',
                            textAlign: 'center',
                            color: '#fff'
                        }} />
                    }

                    {
                        currentPath.result || currentPath.result === '' ?
                            list && !!list.length ?
                                <FilesList
                                    list={list}
                                    goToDirectory={dir => goToDirectory(dir)}
                                    downloadFile={fileName => downloadFile(fileName)}
                                    delete={name => deleteFile(name)}
                                /> : 'no files'
                            : 'connect'
                    }
                </Dropzone>
            </Container>
        );
    }
}

export default FilesListWrapper;