/**
 * Created by juliusz.jakubowski@gmail.com on 10.10.18.
 */

import React from 'react';
import styled from 'styled-components';
import { Button, Header, Icon, Table } from 'semantic-ui-react';

const FilesList = props => (
    <FilesListStyles>
        <Table
            celled
            selectable
            basic='very'
            columns='three'
        >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={12} textAlign='left'>Name</Table.HeaderCell>
                    <Table.HeaderCell width={4} textAlign='center'>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {

                    props.list
                        .sort(( a, b ) => a.type >= b.type || a.name >= b.name)
                        .map(( listElement, i ) => {
                            if (
                                listElement.type === 'd' ||
                                listElement.type === 'dir' ||
                                listElement.type === 'directory'
                            ) {
                                return (
                                    <Table.Row
                                        key={i}
                                        onClick={() => props.goToDirectory(listElement.name)}
                                    >
                                        <Table.Cell textAlign='left'>
                                            <Header as='h4'>
                                                <Header.Content>
                                                    <Icon name='folder open outline' />{listElement.name}
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>

                                        <Table.Cell textAlign='center'>
                                            <Button
                                                basic
                                                icon='download'
                                                className='blue'
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    props.downloadFile(listElement.name);
                                                }}
                                            />

                                            <Button
                                                basic
                                                icon='trash'
                                                className='red'
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    props.delete(listElement.name);
                                                }}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            }
                            else {
                                return (
                                    <Table.Row
                                        key={i}
                                        onClick={() => props.downloadFile(listElement.name)}
                                    >
                                        <Table.Cell textAlign='left'>
                                            <Header as='h4'>
                                                <Header.Content>
                                                    <Header.Subheader>
                                                        <Icon name='file outline' />{listElement.name}
                                                    </Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>

                                        <Table.Cell textAlign='center'>
                                            <Button
                                                basic
                                                icon='download'
                                                className='blue'
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    props.downloadFile(listElement.name);
                                                }}
                                            />

                                            <Button
                                                basic
                                                icon='trash'
                                                className='red'
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    props.delete(listElement.name);
                                                }}
                                            />
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