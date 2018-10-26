/**
 * Created by juliusz.jakubowski@gmail.com on 14.10.18.
 */

import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import FilesList from './FilesList';


class FilesListWrapper extends Component {
    render() {
        const { list, goToDirectory, downloadFile, currentPath, deleteDirOrFile } = this.props;

        return (
            <Container>
                {
                    currentPath.result || currentPath.result === '' ?
                        list && !!list.length ?
                            <FilesList
                                list={list}
                                goToDirectory={dir => goToDirectory(dir)}
                                downloadFile={fileName => downloadFile(fileName)}
                                delete={name => deleteDirOrFile(name)}
                            /> : 'no files'
                        : 'connect'
                }
            </Container>
        );
    }
}

export default FilesListWrapper;