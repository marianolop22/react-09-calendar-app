import '@testing-library/jest-dom';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';

describe ('Pruebas sobre fetch', ()=> {

    let token;

    test('debe de andar fetchSinToken', async () => {
        
        const resp = await fetchSinToken ('auth', {email: 'mama@mia.comm', password:'123456'},'POST');
        expect( resp instanceof Response).toBe(true);

        const body = await resp.json();
        token = body.token;     
        expect (body.ok).toBe(true);
    });

    test('debe de andar fetchConToken', async () => {

        localStorage.setItem('token', token);
        
        const resp = await fetchConToken ('auth/renew');
        expect( resp instanceof Response).toBe(true);

        const body = await resp.json();
        expect (body.ok).toBe(true);
    });

});