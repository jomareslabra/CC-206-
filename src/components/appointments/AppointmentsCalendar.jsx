import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { mockAppointments, appointmentService } from '../../data/mockData';
import AppointmentView from './AppointmentView';

const localizer = momentLocalizer(moment);

const AppointmentsCalendar = () => {
  const [events, setEvents] = useState(mockAppointments.map(apt => ({
    id: apt.id,
    title: `${apt.patientName} - ${apt.title}`,
    start: new Date(apt.start),
    end: new Date(apt.end),
    resource: apt
  })));
  
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [showAppointmentView, setShowAppointmentView] = useState(false);
  const [view, setView] = useState('week'); // month, week, day, agenda

  const handleSelectEvent = useCallback((event) => {
    setSelectedAppointmentId(event.resource.id);
    setShowAppointmentView(true);
  }, []);

  const handleSelectSlot = useCallback((slotInfo) => {
    console.log('Selected slot:', slotInfo);
    // In future, this could open a form to create new appointment
    alert(`Create new appointment starting at ${slotInfo.start.toLocaleTimeString()}`);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#34a853';
      case 'pending': return '#fbbc05';
      case 'cancelled': return '#ea4335';
      default: return '#5f6368';
    }
  };

  const eventStyleGetter = (event) => {
    const status = event.resource.status;
    const backgroundColor = getStatusColor(status);
    
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  const handleCloseAppointmentView = () => {
    setShowAppointmentView(false);
    setSelectedAppointmentId(null);
  };

  return (
    <div className="appointments-calendar">
      <div className="calendar-controls">
        <div className="view-buttons">
          <button 
            className={`btn ${view === 'month' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button 
            className={`btn ${view === 'week' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={`btn ${view === 'day' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button 
            className={`btn ${view === 'agenda' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setView('agenda')}
          >
            Agenda
          </button>
        </div>
        
        <div className="status-legend">
          <div className="legend-item">
            <span className="status-dot confirmed"></span>
            <span>Confirmed</span>
          </div>
          <div className="legend-item">
            <span className="status-dot pending"></span>
            <span>Pending</span>
          </div>
          <div className="legend-item">
            <span className="status-dot cancelled"></span>
            <span>Cancelled</span>
          </div>
        </div>
      </div>

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={true}
          view={view}
          onView={setView}
          eventPropGetter={eventStyleGetter}
          messages={{
            today: 'Today',
            previous: 'Back',
            next: 'Next',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            agenda: 'Agenda',
            date: 'Date',
            time: 'Time',
            event: 'Event',
            noEventsInRange: 'No appointments scheduled for this period.'
          }}
        />
      </div>

      {showAppointmentView && (
        <AppointmentView 
          appointmentId={selectedAppointmentId} 
          onClose={handleCloseAppointmentView}
        />
      )}
    </div>
  );
};

export default AppointmentsCalendar;