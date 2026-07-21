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

    function updateStatus(id, status) {

        router.patch(
            `/admin/service-orders/${id}/status`,
            {
                status: status
            }
        );

    }

    const filteredOrders = orders.filter((order) =>

        order.vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||

        order.vehicle.model.toLowerCase().includes(search.toLowerCase()) ||

        order.vehicle.license_plate.toLowerCase().includes(search.toLowerCase()) ||

        order.mechanic?.name.toLowerCase().includes(search.toLowerCase()) ||

        order.description.toLowerCase().includes(search.toLowerCase()) ||

        order.status.toLowerCase().includes(search.toLowerCase())

    );


    const sections = [

        {
            title: 'Pending / Waiting',
            orders: filteredOrders.filter(
                (order) => order.status === 'pending'
            ),
            badge: 'bg-yellow-100 text-yellow-700'
        },

        {
            title: 'In Progress',
            orders: filteredOrders.filter(
                (order) => order.status === 'in_progress'
            ),
            badge: 'bg-blue-100 text-blue-700'
        },

        {
            title: 'Completed',
            orders: filteredOrders.filter(
                (order) => order.status === 'completed'
            ),
            badge: 'bg-green-100 text-green-700'
        }

    ];



    return (

        <AdminLayout>


            <div className="flex justify-between items-center mb-6">


                <h1 className="text-3xl font-bold">
                    Service Orders
                </h1>


            </div>



            <div className="mb-6">


                <input

                    type="text"

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    placeholder="Search by vehicle, mechanic, status..."

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




            <div className="space-y-10">


                {sections.map((section) => (


                    <div key={section.title}>


                        <div className="flex items-center gap-3 mb-4">


                            <h2 className="text-2xl font-bold">

                                {section.title}

                            </h2>


                            <span
                                className={`
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-medium
                                    ${section.badge}
                                `}
                            >

                                {section.orders.length}

                            </span>


                        </div>





                        {section.orders.length === 0 ? (


                            <div className="bg-white rounded-lg shadow p-6">


                                <p className="text-gray-500">

                                    No orders in this category.

                                </p>


                            </div>



                        ) : (



                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                xl:grid-cols-3
                                gap-6
                            ">



                                {section.orders.map((order) => (


                                    <div

                                        key={order.id}

                                        className="
                                            bg-white
                                            rounded-lg
                                            shadow
                                            p-6
                                        "

                                    >



                                        <div className="flex justify-between items-start">


                                            <div>


                                                <h3 className="text-xl font-bold">

                                                    {order.vehicle.brand}

                                                    {' '}

                                                    {order.vehicle.model}

                                                </h3>


                                                <p className="text-gray-500">

                                                    {order.vehicle.license_plate}

                                                </p>


                                            </div>



                                            <span
                                                className={`
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-medium
                                                    ${section.badge}
                                                `}
                                            >

                                                {section.title}

                                            </span>


                                        </div>





                                        <div className="mt-5 space-y-2">


                                            <p>

                                                <strong>
                                                    Assigned Mechanic:
                                                </strong>


                                                {' '}


                                                {order.mechanic
                                                    ? order.mechanic.name
                                                    : 'Unassigned'}

                                            </p>



                                            <p>

                                                <strong>
                                                    Description:
                                                </strong>


                                                {' '}


                                                {order.description}

                                            </p>




                                            <p>

                                                <strong>
                                                    Total:
                                                </strong>


                                                {' '}


                                                €{Number(order.total_cost).toFixed(2)}

                                            </p>


                                        </div>





                                        <div className="flex items-center gap-3 mt-6 flex-wrap">

                                            {order.status === 'pending' && (

                                                <button
                                                    onClick={() =>
                                                        updateStatus(order.id, 'in_progress')
                                                    }
                                                    className="
                                                        bg-blue-600
                                                        text-white
                                                        px-3
                                                        py-1
                                                        rounded
                                                        text-sm
                                                    "
                                                >
                                                    Start Repair
                                                </button>

                                            )}


                                            {order.status === 'in_progress' && (

                                                <button
                                                    onClick={() =>
                                                        updateStatus(order.id, 'completed')
                                                    }
                                                    className="
                                                        bg-green-600
                                                        text-white
                                                        px-3
                                                        py-1
                                                        rounded
                                                        text-sm
                                                    "
                                                >
                                                    Complete
                                                </button>

                                            )}

                                            <Link

                                                href={`/admin/service-orders/${order.id}`}

                                                className="
                                                    text-green-600
                                                    hover:text-green-800
                                                "

                                                title="View order"

                                            >

                                                <Eye size={20}/>

                                            </Link>





                                            <Link

                                                href={`/admin/service-orders/${order.id}/edit`}

                                                className="
                                                    text-blue-600
                                                    hover:text-blue-800
                                                "

                                                title="Edit order"

                                            >

                                                <Pencil size={20}/>

                                            </Link>





                                            <button

                                                onClick={() => deleteOrder(order.id)}

                                                className="
                                                    text-red-600
                                                    hover:text-red-800
                                                "

                                                title="Delete order"

                                            >

                                                <Trash2 size={20}/>

                                            </button>


                                        </div>


                                    </div>


                                ))}



                            </div>


                        )}



                    </div>


                ))}



            </div>



        </AdminLayout>

    );

}