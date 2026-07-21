import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';


export default function Payments({ serviceOrders, filters }) {

    const [search, setSearch] = useState(filters.search || '');


    function handleSearch(e) {

        const value = e.target.value;

        setSearch(value);


        router.get(
            '/admin/payments',
            {
                search: value
            },
            {
                preserveState: true,
                replace: true
            }
        );

    }


    return (

        <AdminLayout>


            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Payments
                </h1>


            </div>

            <div className="mb-6">

                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by vehicle, model or plate..."
                    className="
                        w-full
                        md:w-1/3
                        px-4
                        py-2
                        border
                        rounded-lg
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />

            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">


                <table className="w-full">


                    <thead>

                        <tr>

                            <th className="p-3 text-left">
                                Order
                            </th>

                            <th className="p-3 text-left">
                                Vehicle
                            </th>

                            <th className="p-3 text-left">
                                Amount
                            </th>

                            <th className="p-3 text-left">
                                Method
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>
                            <th className="p-3 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>


                    {serviceOrders.map((order) => (

                        <tr key={order.id} className="border-b hover:bg-gray-50">

                            <td className="p-3">
                                #{order.id}
                            </td>

                            <td className="p-3">
                                {order.vehicle.brand} {order.vehicle.model}
                            </td>

                            <td className="p-3">
                                {order.vehicle.license_plate}
                            </td>

                            <td className="p-3">
                                €{Number(order.total_cost).toFixed(2)}
                            </td>

                            <td className="p-3">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        order.payment_status === 'paid'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >

                                    {order.payment_status === 'paid'
                                        ? 'Paid'
                                        : 'Pending'}

                                </span>

                            </td>

                            <td className="p-3">

                                {order.payment_status === 'paid' ? (

                                    <Link
                                        href={`/admin/payments/${order.payments[0].id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </Link>

                                ) : (

                                    <Link
                                        href={`/admin/service-orders/${order.id}/payments/create`}
                                        className="text-green-600 hover:underline"
                                    >
                                        Add Payment
                                    </Link>

                                )}

                            </td>

                        </tr>

                    ))}


                    </tbody>


                </table>


            </div>


        </AdminLayout>

    );

}