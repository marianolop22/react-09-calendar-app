import '@testing-library/jest-dom';
import React from 'react';
import { shallow } from 'enzyme';
import { authReducer } from '../../reducers/authReducer';
import { login } from '../../actions/auth';

const initSate = {
    checking: true
}

describe ('Pruebas sobre authReducer', ()=> {

    test('debe de retornar el estado inicial', () => {
        const state = authReducer(initSate, {});
        expect(state).toEqual(initSate);
    });

    test('debe de retornar login', () => {

        const action = login({ uid: '123', name:'pepe'});
        const state = authReducer(initSate, action );
        expect(state).toEqual({ checking: false, uid: '123', name:'pepe'});
    });

});