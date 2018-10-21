/**
 * Created by juliusz.jakubowski@gmail.com on 19.10.18.
 */
import React from 'react';
import { Modal } from 'semantic-ui-react';

export const ModalAddFileOrDirectory = props => (
    <Modal
        basic
        size='small'
        open={props.showUploadModal}
        onClose={() => props.showHideModal()}
    >
        {/*<Header icon='archive' content='Archive Old Messages' />*/}
        {/*<Modal.Content>*/}
        {/*<p>*/}
        {/*Your inbox is getting full, would you like us to enable automatic archiving of old messages?*/}
        {/*</p>*/}
        {/*</Modal.Content>*/}
        {/*<Modal.Actions>*/}
        {/*<Button basic color='red' inverted>*/}
        {/*<Icon name='remove' /> No*/}
        {/*</Button>*/}
        {/*<Button color='green' inverted>*/}
        {/*<Icon name='checkmark' /> Yes*/}
        {/*</Button>*/}
        {/*</Modal.Actions>*/}
    </Modal>
)
