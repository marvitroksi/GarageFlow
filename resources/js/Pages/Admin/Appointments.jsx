import AdminLayout from '@/Layouts/AdminLayout';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useState } from 'react';
import { useForm, router } from '@inertiajs/react'

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import enUS from 'date-fns/locale/en-US';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function AppointmentEvent({ event }) {
    return (
        <div className="text-xs">

            <div className="font-semibold truncate">
                {event.title}
            </div>

            <div className="opacity-90">
                {event.plate}
            </div>

        </div>
    );
}

export default function Appointments({ appointments, vehicles, }) {

    const [showModal, setShowModal] = useState(false);

    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const {

        data,

        setData,

        post,

        processing,

        errors,

        reset,

    } = useForm({

        vehicle_id: '',

        appointment_date: '',

        appointment_time: '',

        notes: '',

    });

    function submitAppointment(e) {

        e.preventDefault();

        post('/admin/appointments', {

            onSuccess: () => {

                setShowModal(false);

                reset();

            }

        });

    }

    function startRepair(appointment) {

        router.post(
            `/admin/appointments/${appointment.id}/start-repair`
        );

    }

    const events = appointments.map((appointment) => {

        const start = new Date(
            `${appointment.appointment_date}T${appointment.appointment_time}`
        );

        const end = new Date(start.getTime() + 60 * 60 * 1000);

        return {

            id: appointment.id,

            title: `${appointment.vehicle.brand} ${appointment.vehicle.model}`,

            plate: appointment.vehicle.license_plate,

            status: appointment.status,

            start,

            end,

        };

    });

    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Appointments
                </h1>

                <button
                    onClick={() => setShowModal(true)}
                    className="
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-blue-700
                        transition
                    "
                >
                    + New Appointment
                </button>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

                <div style={{ height: '750px' }}>

                    <Calendar

                        localizer={localizer}

                        events={events}

                        startAccessor="start"

                        endAccessor="end"

                        defaultView="month"

                        popup

                        selectable

                        onSelectEvent={(event) => {
                            
                            setSelectedAppointment(event)
                        }}

                        components={{
                            event: AppointmentEvent,
                        }}

                        eventPropGetter={(event) => {

                            let backgroundColor = '#3B82F6';

                            if (event.status === 'scheduled') {
                                backgroundColor = '#F59E0B';
                            }

                            if (event.status === 'completed') {
                                backgroundColor = '#10B981';
                            }

                            if (event.status === 'cancelled') {
                                backgroundColor = '#EF4444';
                            }

                            return {

                                style: {

                                    backgroundColor,

                                    borderRadius: '8px',

                                    border: 'none',

                                    color: '#fff',

                                    padding: '2px 4px',

                                },

                            };

                        }}

                    />

                </div>

            </div>
            
            {selectedAppointment && (

                <div className="
                    fixed
                    inset-0
                    bg-black
                    bg-opacity-50
                    flex
                    items-center
                    justify-center
                    z-50
                ">

                    <div className="
                        bg-white
                        rounded-xl
                        shadow-xl
                        p-6
                        w-full
                        max-w-md
                    ">


                        <h2 className="text-2xl font-bold mb-5">
                            Appointment Details
                        </h2>


                        <div className="space-y-3">


                            <p>
                                <strong>Vehicle:</strong>
                                {' '}
                                {selectedAppointment.title}
                            </p>


                            <p>
                                <strong>Plate:</strong>
                                {' '}
                                {selectedAppointment.plate}
                            </p>


                            <p>
                                <strong>Date:</strong>
                                {' '}
                                {selectedAppointment.start.toLocaleDateString()}
                            </p>


                            <p>
                                <strong>Time:</strong>
                                {' '}
                                {selectedAppointment.start.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>


                            <p>
                                <strong>Status:</strong>
                                {' '}
                                {selectedAppointment.status}
                            </p>


                        </div>


                        <div className="flex justify-end gap-3 mt-6">


                            <button

                                onClick={() => setSelectedAppointment(null)}

                                className="
                                    bg-gray-200
                                    px-4
                                    py-2
                                    rounded-lg
                                "

                            >
                                Close

                            </button>


                            <button

                                onClick={() => {
                                    startRepair(selectedAppointment);
                                }}

                                className="
                                    bg-blue-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                "

                            >
                                Start Repair

                            </button>


                        </div>


                    </div>

                </div>

            )}

            {showModal && (

                <div className="
                    fixed
                    inset-0
                    bg-black
                    bg-opacity-50
                    flex
                    items-center
                    justify-center
                    z-50
                ">

                    <div className="
                        bg-white
                        rounded-xl
                        shadow-xl
                        p-6
                        w-full
                        max-w-lg
                    ">

                        <h2 className="text-2xl font-bold mb-5">
                            New Appointment
                        </h2>


                        <form onSubmit={submitAppointment}>


                            <div className="mb-4">

                                <label className="block font-medium mb-2">
                                    Vehicle
                                </label>


                                <select

                                    className="
                                        w-full
                                        border
                                        rounded-lg
                                        p-2
                                    "

                                    value={data.vehicle_id}

                                    onChange={(e) =>
                                        setData(
                                            'vehicle_id',
                                            e.target.value
                                        )
                                    }

                                >

                                    <option value="">
                                        Select vehicle
                                    </option>


                                    {vehicles.map((vehicle) => (

                                        <option
                                            key={vehicle.id}
                                            value={vehicle.id}
                                        >

                                            {vehicle.brand}
                                            {' '}
                                            {vehicle.model}
                                            {' - '}
                                            {vehicle.license_plate}

                                        </option>

                                    ))}


                                </select>


                                {errors.vehicle_id && (

                                    <p className="text-red-600 text-sm">
                                        {errors.vehicle_id}
                                    </p>

                                )}

                            </div>



                            <div className="mb-4">

                                <label className="block font-medium mb-2">
                                    Date
                                </label>


                                <input

                                    type="date"

                                    className="
                                        w-full
                                        border
                                        rounded-lg
                                        p-2
                                    "

                                    value={data.appointment_date}

                                    onChange={(e) =>
                                        setData(
                                            'appointment_date',
                                            e.target.value
                                        )
                                    }

                                />

                            </div>




                            <div className="mb-4">

                                <label className="block font-medium mb-2">
                                    Time
                                </label>


                                <input

                                    type="time"

                                    className="
                                        w-full
                                        border
                                        rounded-lg
                                        p-2
                                    "

                                    value={data.appointment_time}

                                    onChange={(e) =>
                                        setData(
                                            'appointment_time',
                                            e.target.value
                                        )
                                    }

                                />

                            </div>




                            <div className="mb-4">

                                <label className="block font-medium mb-2">
                                    Notes
                                </label>


                                <textarea

                                    className="
                                        w-full
                                        border
                                        rounded-lg
                                        p-2
                                    "

                                    rows="3"

                                    value={data.notes}

                                    onChange={(e) =>
                                        setData(
                                            'notes',
                                            e.target.value
                                        )
                                    }

                                />

                            </div>




                            <div className="flex justify-end gap-3">


                                <button

                                    type="button"

                                    onClick={() => setShowModal(false)}

                                    className="
                                        bg-gray-200
                                        px-4
                                        py-2
                                        rounded-lg
                                    "

                                >

                                    Cancel

                                </button>



                                <button

                                    onClick={() => startRepair(selectedAppointment)}

                                    className="
                                        bg-blue-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                        hover:bg-blue-700
                                    "

                                >

                                    Save Appointment

                                </button>


                            </div>


                        </form>

                    </div>

                </div>

            )}
        </AdminLayout>

    );

}