import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';
import { LoginScreen } from '../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';


jest.mock('../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    auth: {
        checking: true
    }
};
const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <LoginScreen />
    </Provider>
);


describe ('Pruebas sobre LoginScreen', ()=> {

    beforeEach ( ()=> {
        jest.clearAllMocks();
    })

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de llamar a login', () => {
        
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name:'lEmail',
                value: 'pepe@pepe.com'
            }
        });
        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name:'lPassword',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        })

        expect(startLogin).toHaveBeenCalledWith('pepe@pepe.com','123456');


    });

    test('debe de haber errpr en registro', () => {
        
        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name:'rName',
                value: 'mariano'
            }
        });
        wrapper.find('input[name="rEmail"]').simulate('change', {
            target: {
                name:'rEmal',
                value: 'pepe@pepe.com'
            }
        });
        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name:'rPassword',
                value: '123456'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name:'rPassword2',
                value: '1234567'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })

        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben ser iguales', 'error');
        expect(startRegister).toHaveBeenCalledTimes(0);


    });

    test('debe de haber ir el registro', () => {
        
        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name:'rName',
                value: 'mariano'
            }
        });
        wrapper.find('input[name="rEmail"]').simulate('change', {
            target: {
                name:'rEmail',
                value: 'pepe@pepe.com'
            }
        });
        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name:'rPassword',
                value: '123456'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name:'rPassword2',
                value: '123456'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })

        expect(startRegister).toHaveBeenCalledWith("mariano", "pepe@pepe.com", "123456");


    });










});