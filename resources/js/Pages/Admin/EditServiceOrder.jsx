import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';


export default function EditServiceOrder({ order, vehicles, mechanics }) {


    const { data, setData, put, processing } = useForm({

        vehicle_id: order.vehicle_id,
        mechanic_id: order.mechanic_id || '',
        description: order.description,
        status: order.status,
        labor_cost: order.labor_cost,
        notes: order.notes || '',

    });



    function submit(e) {

        e.preventDefault();

        put(`/admin/service-orders/${order.id}`);

    }



    return (

        <AdminLayout>


            <div className="flex justify-between items-center mb-6">


                <h1 className="text-3xl font-bold">
                    Edit Service Order
                </h1>


                <Link
                    href="/admin/service-orders"
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    Cancel
                </Link>


            </div>




            <div className="bg-white p-6 rounded-lg shadow max-w-xl">


                <form onSubmit={submit}>


                    <div className="mb-5">


                        <label className="block font-medium mb-2">
                            Vehicle
                        </label>


                        <select
                            className="w-full border p-2 rounded"
                            value={data.vehicle_id}
                            onChange={e => setData('vehicle_id', e.target.value)}
                        >


                            {vehicles.map((vehicle) => (

                                <option
                                    key={vehicle.id}
                                    value={vehicle.id}
                                >

                                    {vehicle.brand} {vehicle.model} - {vehicle.license_plate}

                                </option>

                            ))}


                        </select>


                    </div>





                    <div className="mb-5">


                        <label className="block font-medium mb-2">
                            Mechanic
                        </label>


                        <select
                            className="w-full border p-2 rounded"
                            value={data.mechanic_id}
                            onChange={e => setData('mechanic_id', e.target.value)}
                        >


                            <option value="">
                                Unassigned
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


                    </div>





                    <div className="mb-5">


                        <label className="block font-medium mb-2">
                            Description
                        </label>


                        <textarea
                            className="w-full border p-2 rounded"
                            rows="4"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />


                    </div>





                    <div className="mb-5">


                        <label className="block font-medium mb-2">
                            Status
                        </label>


                        <select
                            className="w-full border p-2 rounded"
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


                    </div>





                    <div className="mb-5">


                        <label className="block font-medium mb-2">
                            Labor Cost (€)
                        </label>


                        <input
                            type="number"
                            className="w-full border p-2 rounded"
                            value={data.labor_cost}
                            onChange={e => setData('labor_cost', e.target.value)}
                        />


                    </div>





                    <div className="mb-6">


                        <label className="block font-medium mb-2">
                            Notes
                        </label>


                        <textarea
                            className="w-full border p-2 rounded"
                            rows="4"
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                        />


                    </div>





                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >

                        Save Changes

                    </button>



                </form>


            </div>


        </AdminLayout>

    );

}