import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';


export default function ServiceOrders({ orders }) {

    const [search, setSearch] = useState('');

    function deleteOrder(id) {

        if (confirm('Delete this service order?')) {

            router.delete(`/admin/service-orders/${id}`);

        }

    }

    const filteredOrders = orders.filter((order) =>

        order.vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||

        order.vehicle.model.toLowerCase().includes(search.toLowerCase()) ||

        order.vehicle.license_plate.toLowerCase().includes(search.toLowerCase()) ||

        order.mechanic?.name.toLowerCase().includes(search.toLowerCase()) ||

        order.description.toLowerCase().includes(search.toLowerCase()) ||

        order.status.toLowerCase().includes(search.toLowerCase())

);

    return (

        <AdminLayout>


            <div className="flex justify-between items-center mb-6">


                <h1 className="text-3xl font-bold">
                    Service Orders
                </h1>



                <Link
                    href="/admin/service-orders/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Create Order
                </Link>


            </div>

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="Search service orders..."
                    className="w-full border rounded-lg p-3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            <div className="bg-white rounded-lg shadow p-6">


                {filteredOrders.length === 0 ? (


                    <div className="text-center py-6">


                        <p className="text-gray-500 mb-4">
                            No service orders found.
                        </p>


                        <Link
                            href="/admin/service-orders/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Create your first order
                        </Link>


                    </div>



                ) : (



                    <table className="w-full">


                        <thead>


                            <tr className="border-b">


                                <th className="text-left py-3">
                                    Vehicle
                                </th>


                                <th className="text-left py-3">
                                    Mechanic
                                </th>


                                <th className="text-left py-3">
                                    Description
                                </th>


                                <th className="text-left py-3">
                                    Status
                                </th>


                                <th className="text-left py-3">
                                    Labor Cost
                                </th>


                                <th className="text-center py-3">
                                    Actions
                                </th>


                            </tr>


                        </thead>




                        <tbody>



                            {filteredOrders.map((order) => (



                                <tr
                                    key={order.id}
                                    className="border-b"
                                >



                                    <td className="py-3">

                                        {order.vehicle.brand}
                                        {' '}
                                        {order.vehicle.model}

                                    </td>




                                    <td className="py-3">

                                        {order.mechanic
                                            ? order.mechanic.name
                                            : 'Unassigned'}

                                    </td>




                                    <td className="py-3">

                                        {order.description}

                                    </td>




                                    <td className="py-3">


                                        <td className="py-3">


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


                                        </td>


                                    </td>




                                    <td className="py-3">

                                        €{Number(order.labor_cost).toFixed(2)}

                                    </td>




                                    <td className="py-3">


                                        <div className="flex justify-center items-center gap-4">


                                            <Link
                                                href={`/admin/service-orders/${order.id}`}
                                                className="text-green-600 hover:text-green-800"
                                                title="View order"
                                            >

                                                <Eye size={18} />

                                            </Link>




                                            <Link
                                                href={`/admin/service-orders/${order.id}/edit`}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit order"
                                            >

                                                <Pencil size={18} />

                                            </Link>




                                            <button
                                                onClick={() => deleteOrder(order.id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete order"
                                            >

                                                <Trash2 size={18} />

                                            </button>



                                        </div>


                                    </td>




                                </tr>



                            ))}



                        </tbody>



                    </table>



                )}



            </div>



        </AdminLayout>

    );

}