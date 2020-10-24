import { types } from "../types/types";


// {
//     id: new Date().getTime(),
//     title:'Cumpleaños del jefe',
//     start: moment().toDate(), //new Date()
//     end: moment().add(2,'hours').toDate(),
//     bgcolor:'#fafafa',
//     notes:'comprar fafafa',
//     user: {
//         _id: '123',
//         name: 'Mariano'
//     }
// }

const initialSate = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialSate, action) => {

    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };            
        case types.eventAddNew:
            return {
                ...state,
                events: [ ...state.events, action.payload ]
            };            
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent:null
            };            
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map( e => ( e.id === action.payload.id ) ? action.payload : e)
            };    
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter( e => ( e.id !== state.activeEvent.id ) ),
                activeEvent: null
            };    
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
        case types.eventLogout:
            return {
                ...initialSate
            }
    
        default:
            return state;
    }
}
