import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import AnimatedCard from '@/Components/AnimatedCard';
import PrimaryButton from '@/Components/PrimaryButton';
import StatusBadge from '@/Components/StatusBadge';


export default function ServiceOrders({ orders, mechanics }) {


    const [search, setSearch] = useState('');

    const [showEdit, setShowEdit] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);


    const [mechanicId, setMechanicId] = useState('');

    const [status, setStatus] = useState('');

    const [description, setDescription] = useState('');

    const [laborCost, setLaborCost] = useState('');

    const [notes, setNotes] = useState('');



    function openEdit(order) {

        setSelectedOrder(order);

        setMechanicId(order.mechanic?.id ?? '');

        setStatus(order.status);

        setDescription(order.description);

        setLaborCost(order.labor_cost);

        setNotes(order.notes ?? '');

        setShowEdit(true);

    }



    function deleteOrder(id) {

        if (confirm('Delete this service order?')) {

            router.delete(`/admin/service-orders/${id}`);

        }

    }



    function updateStatus(id, status) {

        router.patch(
            `/admin/service-orders/${id}/status`,
            {
                status
            }
        );

    }




    function saveEdit(e) {

        e.preventDefault();


        router.put(
            `/admin/service-orders/${selectedOrder.id}`,
            {
                vehicle_id: selectedOrder.vehicle.id,
                mechanic_id: mechanicId,
                description,
                status,
                labor_cost: laborCost,
                notes
            },
            {
                onSuccess: () => {
                    setShowEdit(false);
                }
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
                (order)=>order.status === 'pending'
            )
        },

        {
            title: 'In Progress',
            orders: filteredOrders.filter(
                (order)=>order.status === 'in_progress'
            )
        },

        {
            title: 'Completed',
            orders: filteredOrders.filter(
                (order)=>order.status === 'completed'
            )
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

                    onChange={(e)=>setSearch(e.target.value)}

                    placeholder="Search by vehicle, mechanic, status..."

                    className="
                        w-full
                        md:w-1/3
                        px-4
                        py-2
                        border
                        rounded-xl
                    "

                />

            </div>





            <div className="space-y-10">


                {sections.map((section)=>(


                    <div key={section.title}>


                        <div className="flex items-center gap-3 mb-4">

                            <h2 className="text-2xl font-bold">
                                {section.title}
                            </h2>


                            <span className="
                                bg-gray-100
                                px-3
                                py-1
                                rounded-full
                                text-sm
                            ">
                                {section.orders.length}
                            </span>

                        </div>





                        {section.orders.length === 0 ? (

                            <AnimatedCard>

                                <p className="text-gray-500">
                                    No orders in this category.
                                </p>

                            </AnimatedCard>


                        ) : (


                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                xl:grid-cols-3
                                gap-6
                            ">


                                {section.orders.map((order)=>(


                                    <AnimatedCard key={order.id}>


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


                                            <StatusBadge status={order.status}/>


                                        </div>





                                        <div className="mt-5 space-y-3">


                                            <p>

                                                <strong>
                                                    Mechanic:
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

                                                <PrimaryButton

                                                    onClick={()=>
                                                        updateStatus(
                                                            order.id,
                                                            'in_progress'
                                                        )
                                                    }

                                                >

                                                    Start Repair

                                                </PrimaryButton>

                                            )}




                                            {order.status === 'in_progress' && (

                                                <PrimaryButton

                                                    onClick={()=>
                                                        updateStatus(
                                                            order.id,
                                                            'completed'
                                                        )
                                                    }

                                                >

                                                    Complete

                                                </PrimaryButton>

                                            )}





                                            <Link

                                                href={`/admin/service-orders/${order.id}`}

                                                className="
                                                    text-green-600
                                                    hover:text-green-800
                                                "

                                            >

                                                <Eye size={20}/>

                                            </Link>





                                            <button

                                                onClick={()=>
                                                    openEdit(order)
                                                }

                                                className="
                                                    text-blue-600
                                                    hover:text-blue-800
                                                "

                                            >

                                                <Pencil size={20}/>

                                            </button>





                                            <button

                                                onClick={()=>
                                                    deleteOrder(order.id)
                                                }

                                                className="
                                                    text-red-600
                                                    hover:text-red-800
                                                "

                                            >

                                                <Trash2 size={20}/>

                                            </button>


                                        </div>


                                    </AnimatedCard>


                                ))}


                            </div>


                        )}


                    </div>


                ))}


            </div>






            <AnimatePresence>


                {showEdit && (


                    <motion.div

                        initial={{opacity:0}}

                        animate={{opacity:1}}

                        exit={{opacity:0}}

                        className="
                            fixed
                            inset-0
                            bg-black/40
                            flex
                            items-center
                            justify-center
                            z-50
                        "

                    >


                        <motion.div

                            initial={{
                                scale:0.95,
                                opacity:0,
                                y:20
                            }}

                            animate={{
                                scale:1,
                                opacity:1,
                                y:0
                            }}

                            exit={{
                                scale:0.95,
                                opacity:0,
                                y:20
                            }}

                            className="
                                bg-white
                                rounded-2xl
                                p-6
                                w-full
                                max-w-lg
                            "

                        >


                            <h2 className="text-2xl font-bold mb-5">
                                Edit Service Order
                            </h2>



                            <form
                                onSubmit={saveEdit}
                                className="space-y-4"
                            >


                                <select

                                    value={mechanicId}

                                    onChange={(e)=>
                                        setMechanicId(e.target.value)
                                    }

                                    className="
                                        border
                                        rounded-xl
                                        w-full
                                        p-3
                                    "

                                >

                                    <option value="">
                                        Unassigned
                                    </option>


                                    {mechanics.map((mechanic)=>(

                                        <option
                                            key={mechanic.id}
                                            value={mechanic.id}
                                        >
                                            {mechanic.name}
                                        </option>

                                    ))}


                                </select>





                                <select

                                    value={status}

                                    onChange={(e)=>
                                        setStatus(e.target.value)
                                    }

                                    className="
                                        border
                                        rounded-xl
                                        w-full
                                        p-3
                                    "

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





                                <textarea

                                    value={description}

                                    onChange={(e)=>
                                        setDescription(e.target.value)
                                    }

                                    className="
                                        border
                                        rounded-xl
                                        w-full
                                        p-3
                                    "

                                />





                                <input

                                    type="number"

                                    value={laborCost}

                                    onChange={(e)=>
                                        setLaborCost(e.target.value)
                                    }

                                    className="
                                        border
                                        rounded-xl
                                        w-full
                                        p-3
                                    "

                                    placeholder="Labor cost"

                                />





                                <textarea

                                    value={notes}

                                    onChange={(e)=>
                                        setNotes(e.target.value)
                                    }

                                    className="
                                        border
                                        rounded-xl
                                        w-full
                                        p-3
                                    "

                                    placeholder="Notes"

                                />





                                <div className="flex justify-end gap-3">


                                    <button

                                        type="button"

                                        onClick={()=>
                                            setShowEdit(false)
                                        }

                                        className="
                                            px-4
                                            py-2
                                            rounded-xl
                                            bg-gray-200
                                        "

                                    >

                                        Cancel

                                    </button>




                                    <PrimaryButton>

                                        Save

                                    </PrimaryButton>


                                </div>


                            </form>


                        </motion.div>


                    </motion.div>


                )}


            </AnimatePresence>



        </AdminLayout>

    );

}