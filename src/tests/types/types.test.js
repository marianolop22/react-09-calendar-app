import '@testing-library/jest-dom';
import React from 'react';
import { shallow } from 'enzyme';
import { types } from '../../types/types';

const typesTest = {
    uiOpenModal: '[UI] open modal',
    uiCloseModal: '[UI] close modal',

    eventAddNew: '[event] add new',
    eventStartAddNew: '[event] start add new',
    eventLogout: '[event] logout',
    eventSetActive:'[event] set active',
    eventClearActiveEvent: '[event] clear active event',
    eventUpdated: '[evetn] event updated',
    eventDeleted: '[event] event deleted',
    eventLoaded: '[event] events loaded',



    authCheckingFinish: '[auth] finish checking login state',
    authStartLogin: '[auth] start login',
    authLogin: '[auth] login',
    authStartRegister: '[auth] start register',
    authStartTokenRenew: '[auth] start token renew',
    authLogout: '[auth] logout'
}

describe ('Pruebas de types', ()=> {
    test('los types deben de ser iguales', () => {
        expect(types).toEqual(typesTest);
    });

});