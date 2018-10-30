/**
 * Created by juliusz.jakubowski@gmail.com on 27.10.18.
 */
import React, { Fragment } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';


const ConfirmDelete = props => (
    <Fragment>
        <Header icon='trash' content='Confirm action' />

        <Modal.Content>
            <h3>Are you sure you want to delete: {props.fileToDelete}</h3>
        </Modal.Content>

        <Modal.Actions>
            <Button
                inverted
                icon='remove'
                content='Cancel'
                onClick={() => props.showHideModal()}
            />

            <Button
                inverted
                icon='checkmark'
                content='Confirm'
                color='red'
                onClick={() => {
                    props.showHideModal();
                    props.deleteDirOrFile(props.fileToDelete)
                }}
            />
        </Modal.Actions>
    </Fragment>
);

export default ConfirmDelete;