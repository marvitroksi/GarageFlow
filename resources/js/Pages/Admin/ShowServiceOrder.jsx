import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AnimatedCard from '@/Components/AnimatedCard';
import PrimaryButton from '@/Components/PrimaryButton';
import StatusBadge from '@/Components/StatusBagde';
import { motion } from "framer-motion"

export default function ShowServiceOrder({ order, mechanics, inventoryItems }) {


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

    const [showAddPart, setShowAddPart] = useState(false);

    const [selectedPart, setSelectedPart] = useState('');

    const [quantity, setQuantity] = useState(1);


    return (

        <AdminLayout>

            <motion.div

                initial={{
                    opacity: 0,
                    y: 20
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.4
                }}

            >

                <div className="flex justify-between items-start mb-8">

                    <div>

                        <div className="flex items-center gap-4 mb-2">

                            <h1 className="text-3xl font-bold">
                                Service Order #{order.id}
                            </h1>

                            <StatusBadge
                                status={order.status}
                                size="large"
                            />

                        </div>

                        <p className="text-gray-500 text-lg">

                            {order.vehicle.brand}
                            {' '}
                            {order.vehicle.model}

                            {' - '}

                            {order.vehicle.license_plate}

                        </p>

                        <div className="flex gap-6 mt-3 text-sm text-gray-500">

                            <span>

                                Created:
                                {' '}
                                {new Date(order.created_at)
                                    .toLocaleDateString()}

                            </span>

                            <span>

                                Updated:
                                {' '}
                                {new Date(order.updated_at)
                                    .toLocaleDateString()}

                            </span>

                        </div>

                    </div>

                    <Link

                        href="/admin/service-orders"

                        className="
                            px-4
                            py-2
                            rounded-xl
                            bg-gray-100
                            hover:bg-gray-200
                            transition
                            font-medium
                        "

                    >

                        ← Back

                    </Link>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Vehicle */}

                    <AnimatedCard>

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Vehicle
                        </h2>

                        <div>

                            <p className="text-xl font-bold text-gray-900">
                                {order.vehicle.brand}
                                {' '}
                                {order.vehicle.model}
                            </p>

                            <p className="text-gray-500 mt-2">

                                License Plate:

                                <span className="font-medium text-gray-700 ml-2">

                                    {order.vehicle.license_plate}

                                </span>

                            </p>

                        </div>

                    </AnimatedCard>


                    {/* Assignment */}

                    <AnimatedCard>

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
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

                            <PrimaryButton>
                                Save
                            </PrimaryButton>

                        </form>

                    </AnimatedCard>


                    {/* Repair Details */}

                    <AnimatedCard>

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
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
                                rows="5"
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

                            <PrimaryButton>
                                Save
                            </PrimaryButton>

                        </form>

                    </AnimatedCard>


                    {/* Costs */}

                    <AnimatedCard>

                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Cost Summary
                        </h2>

                        {/* Labor */}

                        <div className="mb-6">

                            <p className="text-sm text-gray-500 mb-2">
                                Labor Cost
                            </p>

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

                                className="flex gap-3"
                            >

                                <div className="relative">

                                    <span
                                        className="
                                            absolute
                                            left-3
                                            top-2.5
                                            text-gray-500
                                        "
                                    >
                                        €
                                    </span>

                                    <input

                                        type="number"

                                        value={laborCost}

                                        onChange={(e)=>
                                            setLaborCost(e.target.value)
                                        }

                                        className="
                                            border
                                            rounded-xl
                                            pl-7
                                            pr-3
                                            py-2
                                            w-32
                                            focus:ring-2
                                            focus:ring-blue-500
                                            outline-none
                                        "

                                    />

                                </div>

                                <PrimaryButton>
                                    Save
                                </PrimaryButton>

                            </form>

                        </div>


                        {/* Parts */}

                        <div className="mb-4">

                            <div className="flex justify-between items-center mb-4">

                                <h3 className="font-semibold text-lg">
                                    Parts Used
                                </h3>

                                <button

                                    onClick={() => setShowAddPart(true)}

                                    className="
                                        bg-blue-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded-xl
                                        text-sm
                                        font-medium
                                        hover:bg-blue-700
                                        transition
                                    "

                                >

                                    + Add Part

                                </button>

                            </div>

                            {order.items.length > 0 ? (

                                <div className="space-y-3">

                                    {order.items.map((item)=>(

                                        <div

                                            key={item.id}

                                            className="
                                                flex
                                                justify-between
                                                items-center
                                                bg-gray-50
                                                rounded-xl
                                                px-4
                                                py-3
                                            "

                                        >

                                            <div>

                                                <p className="font-medium">
                                                    {item.inventory_item.name}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>

                                            </div>

                                            <span className="font-semibold">

                                                €
                                                {(item.price * item.quantity).toFixed(2)}

                                            </span>

                                        </div>

                                    ))}

                                </div>

                            ) : (

                                <p className="text-gray-500">
                                    No parts used.
                                </p>

                            )}

                        </div>

                        {/* Total */}

                        <div

                            className="
                                mt-6
                                pt-5
                                border-t
                            "

                        >

                            <p className="text-sm text-gray-500">
                                Total Amount
                            </p>

                            <p

                                className="
                                    text-3xl
                                    font-bold
                                    text-blue-600
                                    mt-1
                                "

                            >

                                €

                                {(
                                    Number(laborCost)+
                                    order.items.reduce(
                                        (sum,item)=>
                                        sum + item.price * item.quantity,
                                        0
                                    )

                                ).toFixed(2)}

                            </p>

                        </div>

                    </AnimatedCard>


                    {/* Notes */}

                    <AnimatedCard>

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-lg font-semibold text-gray-800">
                                Notes
                            </h2>

                            <span className="text-sm text-gray-400">
                                Internal
                            </span>

                        </div>

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

                                rows="5"

                                placeholder="Add repair notes, customer requests, observations..."

                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-xl
                                    p-4
                                    text-gray-700
                                    resize-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:outline-none
                                "

                            />

                            <div className="flex justify-end mt-4">

                                <PrimaryButton>
                                    Save Notes
                                </PrimaryButton>

                            </div>

                        </form>

                    </AnimatedCard>

                </div>

            </motion.div>

            {showAddPart && (

            <div className="
                fixed
                inset-0
                bg-black/40
                flex
                items-center
                justify-center
                z-50
            ">


                <div className="
                    bg-white
                    rounded-2xl
                    p-6
                    w-full
                    max-w-md
                    shadow-xl
                ">


                    <h2 className="text-xl font-bold mb-5">
                        Add Part
                    </h2>



                    <select

                        value={selectedPart}

                        onChange={(e)=>
                            setSelectedPart(e.target.value)
                        }

                        className="
                            border
                            rounded-xl
                            w-full
                            p-3
                            mb-4
                        "

                    >

                        <option value="">
                            Select part
                        </option>


                        {inventoryItems.map((item)=>(

                            <option
                                key={item.id}
                                value={item.id}
                            >

                                {item.name}
                                {' '}
                                (Stock: {item.quantity})

                            </option>

                        ))}


                    </select>



                    <input

                        type="number"

                        min="1"

                        value={quantity}

                        onChange={(e)=>
                            setQuantity(e.target.value)
                        }

                        className="
                            border
                            rounded-xl
                            w-full
                            p-3
                            mb-5
                        "

                    />



                    <div className="flex justify-end gap-3">


                        <button

                            onClick={()=>
                                setShowAddPart(false)
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



                        <button

                            onClick={()=>{

                                router.post(
                                    `/admin/service-orders/${order.id}/items`,
                                    {
                                        inventory_item_id:selectedPart,
                                        quantity
                                    }
                                );


                                setShowAddPart(false);

                            }}

                            className="
                                px-4
                                py-2
                                rounded-xl
                                bg-blue-600
                                text-white
                            "

                        >

                            Add

                        </button>


                    </div>


                </div>


            </div>

            )}

        </AdminLayout>

    );

}