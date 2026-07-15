import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';


export default function CreateServiceOrder({ vehicles, mechanics }) {


    const { data, setData, post, processing } = useForm({

        vehicle_id: '',
        mechanic_id: '',
        description: '',
        status: 'pending',
        labor_cost: 0,
        notes: '',

    });



    function submit(e) {

        e.preventDefault();

        post('/admin/service-orders');

    }



    return (

        <AdminLayout>


            <h1 className="text-3xl font-bold mb-6">
                Create Service Order
            </h1>



            <div className="bg-white p-6 rounded-lg shadow max-w-xl">


                <form onSubmit={submit}>


                    <label className="block mb-2">
                        Vehicle
                    </label>


                    <select
                        className="w-full border p-2 mb-4"
                        value={data.vehicle_id}
                        onChange={e => setData('vehicle_id', e.target.value)}
                    >

                        <option value="">
                            Select vehicle
                        </option>


                        {vehicles.map((vehicle) => (

                            <option
                                key={vehicle.id}
                                value={vehicle.id}
                            >

                                {vehicle.brand} {vehicle.model} - {vehicle.license_plate}

                            </option>

                        ))}


                    </select>





                    <label className="block mb-2">
                        Mechanic
                    </label>


                    <select
                        className="w-full border p-2 mb-4"
                        value={data.mechanic_id}
                        onChange={e => setData('mechanic_id', e.target.value)}
                    >

                        <option value="">
                            Select mechanic
                        </option>


                        {mechanics.map((mechanic) => (

                            <option
                                key={mechanic.id}
                                value={mechanic.id}
                            >

                                {mechanic.name}

                            </option>

                        ))}


                    </select>





                    <label className="block mb-2">
                        Description
                    </label>


                    <textarea
                        className="w-full border p-2 mb-4"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                    />





                    <label className="block mb-2">
                        Status
                    </label>


                    <select
                        className="w-full border p-2 mb-4"
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
                    >

                        <option value="pending">
                            Pending
                        </option>


                        <option value="in_progress">
                            In Progress
                        </option>


                        <option value="completed">
                            Completed
                        </option>


                    </select>





                    <label className="block mb-2">
                        Labor Cost
                    </label>


                    <input
                        type="number"
                        className="w-full border p-2 mb-4"
                        value={data.labor_cost}
                        onChange={e => setData('labor_cost', e.target.value)}
                    />





                    <label className="block mb-2">
                        Notes
                    </label>


                    <textarea
                        className="w-full border p-2 mb-6"
                        value={data.notes}
                        onChange={e => setData('notes', e.target.value)}
                    />





                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save Order
                    </button>


                </form>


            </div>


        </AdminLayout>

    );

}