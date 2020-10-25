import '@testing-library/jest-dom';
import React from 'react';
import { shallow } from 'enzyme';
import { uiReducer } from '../../reducers/uiReducer';
import { types } from '../../types/types';
import { uiCloseModal, uiOpenModal } from '../../actions/ui';

const initialState = {
    modalOpen: false
};

describe ('Pruebas sobre uiReducer', ()=> {

    test('debe de retornar el estado por defecto', () => {

        const state = uiReducer( initialState, {})
        expect( state ).toEqual(initialState);
    
    });

    test('debe de abrir y cerrar el modal', () => {

        let action = uiOpenModal();
        let state = uiReducer( initialState, action);
        expect( state ).toEqual({modalOpen: true});

        action = uiCloseModal();
        state = uiReducer( state, action);
        expect( state ).toEqual({modalOpen: false});

        



    });





});