/**
 * Created by juliusz.jakubowski@gmail.com on 19.10.18.
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Button, Header, Icon, Input, Modal } from 'semantic-ui-react';

const { ipcRenderer, remote } = window.require('electron');
const ipc = remote.getGlobal('ipc');

class ModalAddFileOrDirectory extends Component {
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

    modalTypeFile = () => {
        return (
            <Modal
                basic
                size='small'
                open={this.props.showUploadModal}
                onClose={() => this.props.showHideModal()}
            >
                <Header content='Work in progress' />
            </Modal>
        );
    };

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
                        ? this.modalTypeFile()
                        :
                        (
                            <Modal basic size='small' open={showUploadModal} onClose={() => showHideModal()}>
                                <Header icon='folder' content='Create directory ' />

                                <Modal.Content>
                                    <h4>Create directory in {currentPath.result}</h4>
                                    <Input
                                        fluid
                                        type='text'
                                        placeholder='Directory name'
                                        value={newDirectoryName}
                                        onChange={e => this.newDirectoryName(e)}
                                    />
                                </Modal.Content>

                                <Modal.Actions>
                                    <Button
                                        color='red'
                                        inverted
                                        onClick={() => showHideModal()}
                                    >
                                        <Icon name='remove' /> Abort
                                    </Button>

                                    <Button
                                        color='green'
                                        inverted
                                        onClick={() => this.createDirectory()}
                                    >
                                        <Icon name='checkmark' /> Create
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        )
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ModalAddFileOrDirectory);