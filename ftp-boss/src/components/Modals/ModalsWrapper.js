/**
 * Created by juliusz.jakubowski@gmail.com on 26.10.18.
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import ModalCreateDirectory from './ModalCreateDirectory';

const { ipcRenderer, remote } = window.require('electron');
const ipc = remote.getGlobal('ipc');


class ModalsWrapper extends Component {
    static propTypes = {
        showHideModal: PropTypes.func.isRequired,
        refreshFiles: PropTypes.func.isRequired,
        showUploadModal: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired
    };

    constructor() {
        super();

        this.state = {
            newDirectoryName: ''
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

    render() {
        const { showHideModal, showUploadModal, type, currentPath } = this.props;
        const { newDirectoryName } = this.state;

        return (
            <Fragment>
                {
                    type === 'file'
                        ? undefined
                        : <ModalCreateDirectory
                            showHideModal={showHideModal}
                            showUploadModal={showUploadModal}
                            currentPath={currentPath}
                            newDirectoryName={newDirectoryName}
                            setNewDirectoryName={e => this.newDirectoryName(e)}
                            createDirectory={e => this.createDirectory(e)}
                        />
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ModalsWrapper);