/**
 * Created by juliusz.jakubowski@gmail.com on 14.10.18.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import FilesList from './FilesList';

const dropzoneStyles = {
    position: 'relative',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    // padding: '2.5em 0',
    padding: 'auto',
    background: 'rgba(0,0,0,0)',
    textAlign: 'center',
    color: '#fff'
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

        console.log({ accepted });

        const filesToUpload = this.state.filesToUpload;

        for (let file of accepted) {
            console.log({ file });

            filesToUpload.push({
                name: file.name,
                path: file.path
            });
        }

        this.setState({ filesToUpload });
        this.onDragLeave();
        console.log({ filesToUpload });
    };

    removeFilesFromList = fileName => {

        console.log('removeFile');

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
                    {
                        openFileDialog
                            ? dropzoneRef.current.open()
                            : null
                    }

                    {
                        filesToUpload.length &&
                        <Button.Group basic>
                            <Button
                                basic
                                icon='remove'
                                content='Abort'
                                onClick={e => this.removeFilesFromList()}
                            />

                            < Button
                                basic
                                icon='checkmark'
                                content='Upload'
                                color='green'
                                disabled={!filesToUpload.length}
                                onClick={() => this.uploadFiles()}
                            />
                        </Button.Group>
                    }

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