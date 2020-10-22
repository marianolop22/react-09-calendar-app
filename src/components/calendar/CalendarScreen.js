import React, { useState } from 'react'
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from "../../helpers/calendar-messages-es";

import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )

    const onDloubleClick =(e) => {
        dispatch ( uiOpenModal() );
    };

    const onSelectEvent =(e) => {
        dispatch ( eventSetActive (e));
    };

    const onViewChange = (e) => {
        localStorage.setItem('lastView', e);
        setLastView(e);
    };

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadious: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };

    const onSelectSlot = (e) => {
        dispatch ( eventClearActiveEvent() );
    };

    return (
        <div className="calendar-screen">
            <Navbar/>
            <Calendar
                localizer={localizer}
                events={events}
                onDoubleClickEvent={onDloubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onSelectSlot = { onSelectSlot}
                selectable={true}
                components={{
                    event: CalendarEvent
                }}
            />

            {
                (activeEvent) && <DeleteEventFab/>
            }
            <AddNewFab/>
            <CalendarModal/>
        </div>
    )
}