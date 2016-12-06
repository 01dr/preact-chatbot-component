/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.11.16
 */

import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import store from './store';

import Main from './containers/Main';

render((
    <Provider store={store}>
        <Main/>
    </Provider>
), document.body);