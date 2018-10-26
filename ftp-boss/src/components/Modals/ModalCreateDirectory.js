/**
 * Created by juliusz.jakubowski@gmail.com on 19.10.18.
 */
import React from 'react';
import { Button, Header, Icon, Input, Modal } from 'semantic-ui-react';


const ModalCreateDirectory = props => (
    <Modal
        basic
        size='small'
        open={props.showUploadModal}
        onClose={() => props.showHideModal()}
    >
        <Header icon='folder' content='Create directory ' />

        <Modal.Content>
            <h4>Create directory in {props.currentPath.result}</h4>
            <Input
                fluid
                type='text'
                placeholder='Directory name'
                value={props.newDirectoryName}
                onChange={e => props.setNewDirectoryName(e)}
            />
        </Modal.Content>

        <Modal.Actions>
            <Button
                color='red'
                inverted
                onClick={() => props.showHideModal()}
            >
                <Icon name='remove' /> Abort
            </Button>

            <Button
                color='green'
                inverted
                onClick={() => props.createDirectory()}
            >
                <Icon name='checkmark' /> Create
            </Button>
        </Modal.Actions>
    </Modal>
);

export default ModalCreateDirectory;