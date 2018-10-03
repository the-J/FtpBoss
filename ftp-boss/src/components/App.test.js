/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
