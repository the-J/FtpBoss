/**
 * Created by juliusz.jakubowski@gmail.com on 10.10.18.
 */

import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const TopButtons = ( props ) => (
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
            <Button.Group basic>
                <Button
                    icon='backward'
                    onClick={() => props.goToDirectory(undefined, 'backwards')}
                />

                <Button
                    icon='home'
                    onClick={() => props.goToDirectory(undefined, 'home')}
                />
            </Button.Group>
        }

        <Button
            basic
            floated='right'
            as={Link}
            to='/ftp'
            labelPosition='right'
            icon='setting'
            content='SETTINGS'
        />
    </Container>
);
