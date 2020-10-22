import { types } from "../types/types";


/**
 * Agrega el nuevo evento al store de redux
 * @param {{}} event - Objeto de tipo evento
 */
export const eventAddNew = (event) => ({
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