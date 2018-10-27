/**
 * Created by juliusz.jakubowski@gmail.com on 10.10.18.
 */

import React, { Fragment } from 'react';
import { Button, Container, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const TopButtons = props => (
    <Container columnts='equal'>
        <Button
            basic
            loading={props.connectingFtp}
            labelPosition='right'
            icon='linkify'
            content='CONNECT'
            onClick={() => props.goToDirectory()}
        />

        {
            props.currentPath.result &&
            props.currentPath.result !== '/' &&

            <Fragment>
                <Button.Group basic>
                    <Popup
                        basic
                        content='Go back'
                        position='bottom center'
                        trigger={
                            <Button
                                disabled={props.connectingFtp}
                                icon='backward'
                                onClick={() => props.goToDirectory(undefined, 'backwards')}
                            />
                        }
                    />

                    <Popup
                        basic
                        content='Home'
                        position='bottom center'
                        trigger={
                            <Button
                                disabled={props.connectingFtp}
                                icon='home'
                                onClick={() => props.goToDirectory(undefined, 'home')}
                            />
                        }
                    />
                </Button.Group>

                <Button.Group
                    basic
                    positive
                >
                    <Popup
                        basic
                        content='Upload files'
                        position='bottom center'
                        trigger={
                            <Button
                                disabled
                                onClick={() => props.showHideModal('file')}
                            >
                                <Icon.Group>
                                    <Icon name='file' size='small' />
                                    <Icon corner name='add' />
                                </Icon.Group>
                            </Button>
                        }
                    />

                    <Popup
                        basic
                        content='Create directory'
                        position='bottom center'
                        trigger={
                            <Button
                                disabled={props.connectingFtp}
                                onClick={() => props.showHideModal('createDirectory')}
                            >
                                <Icon.Group>
                                    <Icon name='folder' size='small' />
                                    <Icon corner name='add' />
                                </Icon.Group>
                            </Button>
                        }
                    />
                </Button.Group>
            </Fragment>
        }

        <Button
            basic
            floated='right'
            as={Link}
            to='/settings'
            labelPosition='right'
            icon='setting'
            content='SETTINGS'
        />
    </Container>
);
