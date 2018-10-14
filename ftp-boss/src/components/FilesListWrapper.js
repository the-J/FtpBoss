import React, { Component } from 'react';

import FilesList from './FilesList';

/**
 * Created by juliusz.jakubowski@gmail.com on 14.10.18.
 */


class FilesListWrapper extends Component {
    constructor() {
        super();

        this.state = {
            list: [],
            connectingFtp: false
        };
    }

    render() {
        const { list, goToDirectory, downloadFile } = this.props;

        return (
            <span>
         {
             list && !!list.length ?
                 <FilesList
                     list={list}
                     goToDirectory={dir => goToDirectory(dir)}
                     download={fileName => downloadFile(fileName)}
                 /> : 'nothing to display'
         }
     </span>
        );
    }
}

export default FilesListWrapper;