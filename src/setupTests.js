// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createSerializer} from 'enzyme-to-json';
import Swal from "sweetalert2";
 
configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));


//esto es para que si hay algo que hacer un ScrollTo, lo reemplazo por una nueva implementacion.
// const noScroll = () => {};
// Object.defineProperty(window, 'scrollTo', { value: noScroll, writable: true });


jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    close: jest.fn()
}));

//esto pasa con los modales
HTMLCanvasElement.prototype.getContext = ()=>{};