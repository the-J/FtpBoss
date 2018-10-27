/**
 * Created by juliusz.jakubowski@gmail.com on 19.10.18.
 */
import React, { Fragment } from 'react';
import { Button, Header, Input, Modal } from 'semantic-ui-react';


const CreateDirectory = props => (
    <Fragment>
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
                inverted
                icon='remove'
                content='Abort'
                color='red'
                onClick={() => props.showHideModal()}
            />

            <Button
                inverted
                icon='checkmark'
                content='Create'
                color='green'
                disabled={!props.newDirectoryName}
                onClick={() => props.createDirectory()}
            />
        </Modal.Actions>
    </Fragment>
);

export default CreateDirectory;