import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';




const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );


// store.dispatch = jest.fn();

describe ('Pruebas sobre AppRouter', ()=> {

    test('debe de mostrar el espere...', () => {

        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockStore( initState );


        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de renderizar la pagina la pagina publica', () => {

        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);
    });

    test('debe de renderizar la pagina la pagina privada', () => {

        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'pepe'
            },
            calendar: {
                events:[],
                activeEvent: null
            },
            ui: {
                modalOpen: false
            }
        };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar-brand').text().trim()).toBe(initState.auth.name);
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);
    });





});