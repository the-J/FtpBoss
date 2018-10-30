/**
 * Created by juliusz.jakubowski@gmail.com on 27.10.18.
 */

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Button, Header, Modal } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';


const CreateDirectory = props => (
    <Fragment>
        <Header icon='file' content='Drop files here' />

        <Modal.Content>
            <Dropzone
                disableClick
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    padding: '2.5em 0',
                    background: 'rgba(0,0,0,0.5)',
                    textAlign: 'center',
                    color: '#fff'
                }}
                onDrop={e => props.onDrop(e)}
                onDragEnter={() => props.onDragEnter()}
                onDragLeave={() => props.onDragLeave()}
            >

                {
                    props.dropzoneActive && <span style={{
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
                <ul>
                    {
                        props.filesToUpload.map(( file, index ) => <li key={index}>{file.name} - {file.path}</li>)
                    }
                </ul>
            </Dropzone>
        </Modal.Content>

        <Modal.Actions>
            <Button
                inverted
                icon='remove'
                content='Abort'
                onClick={e => {
                    console.log({ e });
                    props.removeFile();
                    props.showHideModal();
                }}
            />

            <Button
                inverted
                icon='checkmark'
                content='Upload'
                color='green'
                disabled={!props.filesToUpload.length}
                onClick={() => {
                    props.showHideModal();
                    props.uploadFiles();
                }}
            />
        </Modal.Actions>
    </Fragment>
);

const DropZoneStyles = styled.div`
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    // padding: '2.5em 0';
                    textAlign: center;
                    color: #fff;
                    border: grey 2px solid
                `;
export default CreateDirectory;