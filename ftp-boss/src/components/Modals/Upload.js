/**
 * Created by juliusz.jakubowski@gmail.com on 27.10.18.
 */

import React, { Fragment } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';


const CreateDirectory = props => (
    <Fragment>
        <Header icon='file' content='Upload files' />

        <Modal.Content>
            <h4>Drop files here</h4>
            <Dropzone onDrop={e => {
                if (!e.length) return console.log('no files droped');

                props.handdleOnDrop(e)
            }} />
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
                onClick={() => props.uploadFiles()}
            />
        </Modal.Actions>
    </Fragment>
);

export default CreateDirectory;