/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.11.16
 */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import DevTools from '../containers/devTools';
import reducers from '../reducers';

const initialState = {};

const loggerMiddleware = createLogger({
	level: 'info',
	collapsed: true
});

const enhancer = compose(
	applyMiddleware(thunk, loggerMiddleware),
	// DevTools.instrument()
);

const store = createStore(combineReducers(reducers), initialState, enhancer);

export default store;
