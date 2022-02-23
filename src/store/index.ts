import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import {chatListMiddleware} from './ChatList/middleware';
import {chatListReducer} from './ChatList/reducer';
import {chatUsersMiddleware} from './ChatUsers/middleware';
import {chatUsersReducer} from './ChatUsers/reducer';
import {loggerMiddleware} from './loggerMiddleware';
import {UserMiddleware} from './User/middleware';
import {UserReducer} from './User/reducer';
import {messagesReducer} from './Messages/reducer';
import {messagesMiddleware} from './Messages/middleware';
import type {AppState} from './types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers<AppState>({user: UserReducer, chats: chatListReducer, chatUsers: chatUsersReducer, messages: messagesReducer});
const middlewareEnhancer = applyMiddleware(loggerMiddleware, UserMiddleware, chatListMiddleware, chatUsersMiddleware, messagesMiddleware);

export const store = createStore(rootReducer, composeEnhancers(middlewareEnhancer));
