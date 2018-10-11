/**
 * Created by juliusz.jakubowski@gmail.com on 10.10.18.
 */

import React from 'react';
import styled from 'styled-components';
import { Button, Container } from 'semantic-ui-react';

const FilesList = ( props ) => (
    <FilesListStyles>
        <Container columnts='equal'>
            <Button.Group
                basic
                vertical
            >
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
                                    <Button
                                        key={i}
                                        labelPosition='right'
                                        icon='folder open outline'
                                        content={listElement.name}
                                        onClick={() => props.goToDirectory(listElement.name)}
                                    />
                                );
                            }
                            else {
                                return (
                                    <Button
                                        key={i}
                                        labelPosition='right'
                                        icon='download'
                                        content={listElement.name}
                                        onClick={() => props.download(listElement.name)}
                                    />
                                );
                            }
                        })
                }
            </Button.Group>
        </Container>
    </FilesListStyles>
);

const FilesListStyles = styled.div`
  margin-top: 20px
`;

export default FilesList;