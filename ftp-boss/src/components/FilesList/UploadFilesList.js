/**
 * Created by juliusz.jakubowski@gmail.com on 30.10.18.
 */

import React, { Fragment } from 'react';
import { Button, Grid, Icon, List, Popup } from 'semantic-ui-react';
import styled from 'styled-components';


const FilesList = props => (
    <Fragment>
        <Grid divided columns={2}>
            <Grid.Column width={10}>
                <List divided relaxed size='small'>
                    {props.list.map(( listElement, i ) => (
                        <List.Item key={i}>
                            <List.Icon name={listElement.type === '' ? 'folder open outline' : 'file outline'} />
                            <List.Content>
                                <List.Header>
                                    {listElement.name}

                                    <PopupStyles>
                                        <Popup
                                            basic
                                            content='Remove from list'
                                            position='bottom center'
                                            trigger={
                                                <Icon
                                                    name='trash'
                                                    className='red'
                                                    onClick={() => props.removeFilesFromList(listElement.name)}
                                                />
                                            }
                                        />
                                    </PopupStyles>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Grid.Column>

            <Grid.Column width={6}>
                < Button
                    basic
                    fluid
                    size='small'
                    icon='upload'
                    content='Upload'
                    color='blue'
                    disabled={!props.list.length}
                    onClick={() => props.uploadFiles()}
                />

                <Button
                    basic
                    fluid
                    size='small'
                    icon='remove'
                    content='Cancel'
                    onClick={() => props.removeFilesFromList()}
                />
            </Grid.Column>
        </Grid>
    </Fragment>
);

const PopupStyles = styled.span`float: right;`;

export default FilesList;