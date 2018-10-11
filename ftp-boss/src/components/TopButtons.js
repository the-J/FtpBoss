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
            <Button
                basic
                icon='backward'
                onClick={() => props.goOneDirectoryBack()}
            />
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
