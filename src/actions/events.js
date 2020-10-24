import { types } from "../types/types";
import { fetchConToken  } from '../helpers/fetch';
import Swal from "sweetalert2";
import { prepareEvents } from "../helpers/prepareEvents";

export const eventStartAddNew = (event) => {
    
    return async (dispatch, getState) => {
        
        const {uid, name} = getState().auth;

        try {
            
            const resp = await fetchConToken ('events', event, 'POST');
            const body = await resp.json();
    
            if ( body.ok ) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                };
                dispatch (eventAddNew(event));
            } else {
                Swal.fire('Error', body.msg,  'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}


/**
 * Agrega el nuevo evento al store de redux
 * @param {{}} event - Objeto de tipo evento
 */
const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

/**
 * Setea el evento seleccionado como activo
 * @param {{}} event - Objeto de tipo evento
 */
export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

/**
 * Actualiza el evento indicado
 * @param {{}} event - Objeto de tipo evento
 */
export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

/**
 * Limpia en el store el evento activo
 */
export const eventClearActiveEvent = () =>( {
    type: types.eventClearActiveEvent
});

/**
 * Elimina un evento activo
 */
export const eventDeleted = () =>( {
    type: types.eventDeleted
});


export const eventStartLoading = () => {
    return async (dispatch) => {
        
        try {
            const resp = await fetchConToken ('events', {} );
            const body = await resp.json();
    
            if ( body.ok ) {
                const events = prepareEvents(body.eventos);
                dispatch (eventsLoaded(events));
            } else {
                Swal.fire('Error', body.msg,  'error');
            }
        } catch (error) {
            console.log(error);
        }

    }
}

const eventsLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventStartUpdate = (event) => {
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken (`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
    
            if ( body.ok ) {
                dispatch (eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg,  'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export const eventStartDelete = () => {
    return async (dispatch, getState) => {

        const {id} = getState().calendar.activeEvent;


        try {
            const resp = await fetchConToken (`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
    
            if ( body.ok ) {
                dispatch (eventDeleted());
            } else {
                Swal.fire('Error', body.msg,  'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export const eventLogout = () => ({
    type: types.eventLogout
});
