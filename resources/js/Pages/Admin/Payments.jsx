import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';


export default function Payments({ payments, filters }) {

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


                    {payments.map((payment) => (

                        <tr
                            key={payment.id}
                            className="border-t hover:bg-gray-50"
                        >

                            <td className="p-3">
                                #{payment.service_order_id}
                            </td>


                            <td className="p-3">

                                {payment.service_order.vehicle.brand}

                                {' '}

                                {payment.service_order.vehicle.model}

                            </td>


                            <td className="p-3 font-semibold">

                                €{Number(payment.amount).toFixed(2)}

                            </td>


                            <td className="p-3 capitalize">

                                {payment.method}

                            </td>


                            <td className="p-3">

                                <span
                                    className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium
                                        ${
                                            payment.status === 'paid'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }
                                    `}
                                >

                                    {payment.status === 'paid'
                                        ? 'Paid'
                                        : 'Not Paid'
                                    }

                                </span>

                            </td>

                            <td className="p-3 flex gap-5">


                                <Link
                                    href={`/admin/payments/${payment.id}`}
                                    className="
                                        text-green-600
                                        hover:text-green-800
                                        transition
                                    "
                                    title="View payment"
                                >
                                    <Eye size={18} />
                                </Link>


                                <button
                                    onClick={() => {

                                        if(confirm('Are you sure you want to delete this payment?')) {

                                            router.delete(
                                                `/admin/payments/${payment.id}`
                                            );

                                        }

                                    }}
                                    className="
                                        text-red-600
                                        hover:text-red-800
                                        transition
                                    "
                                    title="Delete payment"
                                >
                                    <Trash2 size={18} />
                                </button>


                            </td>


                        </tr>

                    ))}


                    </tbody>


                </table>


            </div>


        </AdminLayout>

    );

}