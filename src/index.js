/*
 * @Author: chazshi 
 * @Date: 2017-12-28 04:05:46 
 * @Last Modified by: chazshi
 * @Last Modified time: 2018-02-15 00:29:13
 */
// look at 7-1
// now throble in: network havn`t receive a response called 'info', but 'bossinfo'
// on the 'bossinfo' page we can find a 'info' if we do the refresh opration

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import reducers from './reducer.js'
import './config'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'

const Boss = () =>{
    return <h2>Boss页面</h2>
}

//chrome redux extension
//这里要写f => f
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension(): f=>f;

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
));

// console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path='/boss' component={Boss}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <h1>主页面，需要做跳转</h1>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
