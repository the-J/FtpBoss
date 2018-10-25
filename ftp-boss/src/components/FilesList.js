/**
 * Created by juliusz.jakubowski@gmail.com on 10.10.18.
 */

import React from 'react';
import styled from 'styled-components';
import { Button, Header, Table } from 'semantic-ui-react';

const FilesList = ( props ) => (
    <FilesListStyles>
        <Table
            basic='very'
            celled
            textAlign='center'
            columns='three'
        >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width='eight'>Name</Table.HeaderCell>
                    <Table.HeaderCell width='four'>Type</Table.HeaderCell>
                    <Table.HeaderCell width='four'>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {

                    props.list
                        .sort(( a, b ) => a.type >= b.type)
                        .map(( listElement, i ) => {
                            if (
                                listElement.type === 'd' ||
                                listElement.type === 'dir' ||
                                listElement.type === 'directory'
                            ) {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>
                                                    {listElement.name}
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>

                                        <Table.Cell>directory</Table.Cell>

                                        <Table.Cell>
                                            <Button.Group>
                                                <Button
                                                    icon='folder open outline'
                                                    onClick={() => props.goToDirectory(listElement.name)}
                                                />

                                                <Button
                                                    icon='trash'
                                                    onClick={() => props.delete(listElement.name)}
                                                />
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            }
                            else {
                                return (
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>
                                                    <Header.Subheader>{listElement.name}</Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>

                                        <Table.Cell>{listElement.type}</Table.Cell>

                                        <Table.Cell>
                                            <Button.Group>
                                                <Button
                                                    icon='download'
                                                    onClick={() => props.download(listElement.name)}
                                                />

                                                <Button
                                                    icon='trash'
                                                    onClick={() => props.delete(listElement.name)}
                                                />
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            }
                        })
                }
            </Table.Body>
        </Table>
    </FilesListStyles>
);

const FilesListStyles = styled.div`
  margin-top: 20px
`;

export default FilesList;