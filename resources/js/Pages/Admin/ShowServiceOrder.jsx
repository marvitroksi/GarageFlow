import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';


export default function ShowServiceOrder({ order, mechanics }) {


    const [laborCost, setLaborCost] = useState(
        order.labor_cost || 0
    );


    const [mechanicId, setMechanicId] = useState(
        order.mechanic_id || ''
    );


    const [description, setDescription] = useState(
        order.description || ''
    );


    const [notes, setNotes] = useState(
        order.notes || ''
    );



    return (

        <AdminLayout>


            <div className="flex justify-between items-center mb-6">


                <div>

                    <h1 className="text-3xl font-bold">
                        Service Order #{order.id}
                    </h1>


                    <p className="text-gray-500">
                        Created:
                        {' '}
                        {new Date(order.created_at).toLocaleDateString()}
                    </p>


                </div>


                <Link
                    href="/admin/service-orders"
                    className="
                        bg-gray-200
                        px-4
                        py-2
                        rounded
                        hover:bg-gray-300
                    "
                >
                    Back
                </Link>


            </div>





            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">





                {/* Vehicle */}

                <div className="bg-white p-6 rounded-lg shadow">


                    <h2 className="text-xl font-bold mb-4">
                        Vehicle
                    </h2>


                    <p>
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







                {/* Assignment */}


                <div className="bg-white p-6 rounded-lg shadow">


                    <h2 className="text-xl font-bold mb-4">
                        Assignment
                    </h2>



                    <form
                        onSubmit={(e)=>{

                            e.preventDefault();


                            router.patch(
                                `/admin/service-orders/${order.id}/mechanic`,
                                {
                                    mechanic_id: mechanicId
                                }
                            );

                        }}
                        className="flex gap-3"
                    >


                        <select
                            value={mechanicId}
                            onChange={(e)=>
                                setMechanicId(e.target.value)
                            }
                            className="
                                border
                                rounded-lg
                                px-3
                                py-2
                                flex-1
                            "
                        >

                            <option value="">
                                Unassigned
                            </option>


                            {mechanics?.map((mechanic)=>(

                                <option
                                    key={mechanic.id}
                                    value={mechanic.id}
                                >
                                    {mechanic.name}
                                </option>

                            ))}


                        </select>


                        <button
                            className="
                                bg-blue-600
                                text-white
                                px-4
                                rounded-lg
                            "
                        >
                            Save
                        </button>


                    </form>


                </div>







                {/* Repair Details */}


                <div className="bg-white p-6 rounded-lg shadow">


                    <h2 className="text-xl font-bold mb-4">
                        Repair Details
                    </h2>



                    <form
                        onSubmit={(e)=>{

                            e.preventDefault();


                            router.patch(
                                `/admin/service-orders/${order.id}/description`,
                                {
                                    description
                                }
                            );

                        }}
                    >


                        <textarea
                            value={description}
                            onChange={(e)=>
                                setDescription(e.target.value)
                            }
                            className="
                                border
                                rounded-lg
                                w-full
                                p-3
                                mb-3
                            "
                        />


                        <button
                            className="
                                bg-blue-600
                                text-white
                                px-4
                                py-2
                                rounded-lg
                            "
                        >
                            Save Description
                        </button>


                    </form>



                    <div className="mt-4">


                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                
                                order.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'in_progress'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-gray-100 text-gray-700'

                            }`}
                        >

                            {order.status}

                        </span>


                    </div>


                </div>








                {/* Costs */}


                <div className="bg-white p-6 rounded-lg shadow">


                    <h2 className="text-xl font-bold mb-4">
                        Costs
                    </h2>



                    <form
                        onSubmit={(e)=>{

                            e.preventDefault();


                            router.patch(
                                `/admin/service-orders/${order.id}/labor-cost`,
                                {
                                    labor_cost: laborCost
                                }
                            );

                        }}
                        className="flex gap-3 mb-6"
                    >


                        <input
                            type="number"
                            value={laborCost}
                            onChange={(e)=>
                                setLaborCost(e.target.value)
                            }
                            className="
                                border
                                rounded-lg
                                px-3
                                py-2
                                w-32
                            "
                        />


                        <button
                            className="
                                bg-blue-600
                                text-white
                                px-4
                                rounded-lg
                            "
                        >
                            Save
                        </button>


                    </form>





                    <h3 className="font-semibold mb-2">
                        Parts Used
                    </h3>


                    {order.items.map((item)=>(


                        <div
                            key={item.id}
                            className="
                                flex
                                justify-between
                                border-b
                                py-2
                            "
                        >

                            <span>
                                {item.inventory_item.name}
                                {' '}
                                x{item.quantity}
                            </span>


                            <span>
                                €
                                {(item.price * item.quantity).toFixed(2)}
                            </span>


                        </div>


                    ))}




                    <div className="border-t mt-4 pt-4 font-bold">

                        Total:

                        €

                        {(
                            Number(laborCost)+
                            order.items.reduce(
                                (sum,item)=>
                                sum + item.price * item.quantity,
                                0
                            )
                        ).toFixed(2)}

                    </div>


                </div>







                {/* Notes */}


                <div className="bg-white p-6 rounded-lg shadow md:col-span-2">


                    <h2 className="text-xl font-bold mb-4">
                        Notes
                    </h2>



                    <form
                        onSubmit={(e)=>{

                            e.preventDefault();


                            router.patch(
                                `/admin/service-orders/${order.id}/notes`,
                                {
                                    notes
                                }
                            );

                        }}
                    >


                        <textarea
                            value={notes}
                            onChange={(e)=>
                                setNotes(e.target.value)
                            }
                            className="
                                border
                                rounded-lg
                                w-full
                                p-3
                                mb-3
                            "
                        />


                        <button
                            className="
                                bg-blue-600
                                text-white
                                px-4
                                py-2
                                rounded-lg
                            "
                        >
                            Save Notes
                        </button>


                    </form>


                </div>


            </div>





            <div className="mt-6">


                <Link
                    href={`/admin/service-orders/${order.id}/items/create`}
                    className="
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                    "
                >
                    Add Part
                </Link>


            </div>


        </AdminLayout>

    );

}