import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from "../../helpers/fetch";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();

let token='';

describe ('Pruebas sobre auth', ()=> {

    beforeEach ( ()=>{
        store = mockStore( initState );
        jest.clearAllMocks();
    });


    test('startLogin correcto', async () => {

        await store.dispatch (startLogin ('mama@mia.comm', '123456') );
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        //esto es una manera de extraer el token del parametro con el que fue llamaado el localstorage
        token = localStorage.setItem.mock.calls[0][1];
    });

    test('startLogin incorrecto', async () => {

        const resp = await store.dispatch (startLogin ('mama@mia.comm', '1234567') );
        const actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'contraseña incorrecta', 'error');


    });

    test('startregister correcto', async () => {

        fetchModule.fetchSinToken = jest.fn(()=> ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'pepe',
                    token: '1231231231231'
                }
            }
        }));


        await store.dispatch (startRegister ('test','testing@testing.com', '123456') );
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'pepe'
            }
        })
        expect(localStorage.setItem).toHaveBeenCalledWith('token', '1231231231231');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));


        //esto es una manera de extraer el token del parametro con el que fue llamaado el localstorage
        // localStorage.setItem.mock.calls[0][1];
    });

    test('startChecking correcto', async () => {

        fetchModule.fetchConToken = jest.fn(()=> ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'pepe',
                    token: '1231231231231'
                }
            }
        }));

        await store.dispatch (startChecking () );
        const actions = store.getActions();

        localStorage.setItem('token', token);

        expect( actions[0]).toEqual({
            type:types.authLogin,
            payload: {
                uid: '123',
                name: 'pepe'
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', '1231231231231');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    })
        



});