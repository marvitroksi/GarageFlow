import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';


export default function ShowServiceOrder({ order }) {


    return (

        <AdminLayout>


            <div className="flex justify-between items-center mb-6">


                <h1 className="text-3xl font-bold">
                    Service Order #{order.id}
                </h1>

                <p className="text-gray-500 mt-1">
                    Created: {new Date(order.created_at).toLocaleDateString()}
                </p>

                <p className="text-gray-500">
                    Last Updated: {new Date(order.updated_at).toLocaleDateString()}
                </p>

                <Link
                    href="/admin/service-orders"
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    Back
                </Link>


            </div>




            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



                <div className="bg-white p-6 rounded-lg shadow">


                    <h2 className="text-xl font-bold mb-4">
                        Vehicle
                    </h2>


                    <p className="text-gray-700">

                        {order.vehicle.brand}
                        {' '}
                        {order.vehicle.model}

                    </p>


                    <p className="text-gray-500 mt-2">

                        Plate:
                        {' '}
                        {order.vehicle.license_plate}

                    </p>


                </div>





                <div className="bg-white p-6 rounded-lg shadow">


                    <h2 className="text-xl font-bold mb-4">
                        Assignment
                    </h2>


                    <p className="text-gray-700">

                        Mechanic:

                        {' '}

                        {order.mechanic
                            ? order.mechanic.name
                            : 'Unassigned'}

                    </p>


                </div>





                <div className="bg-white p-6 rounded-lg shadow">


                    <h2 className="text-xl font-bold mb-4">
                        Repair Details
                    </h2>


                    <p className="text-gray-700 mb-4">

                        {order.description}

                    </p>




                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                            
                            order.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'in_progress'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-gray-100 text-gray-700'

                        }`}
                    >

                        {order.status === 'completed'
                            ? 'Completed'
                            : order.status === 'in_progress'
                                ? 'In Progress'
                                : 'Pending'
                        }

                    </span>


                </div>





                <div className="bg-white p-6 rounded-lg shadow">


                    <h2 className="text-xl font-bold mb-4">
                        Costs
                    </h2>


                    <p className="text-gray-700">

                        Labor Cost:

                        {' '}

                        €{Number(order.labor_cost).toFixed(2)}

                    </p>


                </div>





                <div className="bg-white p-6 rounded-lg shadow md:col-span-2">


                    <h2 className="text-xl font-bold mb-4">
                        Notes
                    </h2>


                    <p className="text-gray-700">

                        {order.notes || 'No notes available'}

                    </p>


                </div>



            </div>



        </AdminLayout>

    );

}