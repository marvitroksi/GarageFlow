import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import AnimatedCard from '@/Components/AnimatedCard';
import PrimaryButton from '@/Components/PrimaryButton';
import StatusBadge from '@/Components/StatusBadge';


export default function Vehicles({ vehicles, mechanics }) {


    const [search, setSearch] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [editingVehicle, setEditingVehicle] = useState(null);


    const emptyForm = {

        license_plate:'',
        brand:'',
        model:'',
        year:'',
        owner_name:'',
        mechanic_id:'',
        status:'waiting'

    };


    const [form, setForm] = useState(emptyForm);



    function openCreate(){

        setEditingVehicle(null);

        setForm(emptyForm);

        setShowModal(true);

    }




    function openEdit(vehicle){

        setEditingVehicle(vehicle);


        setForm({

            license_plate: vehicle.license_plate,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            owner_name: vehicle.owner_name,
            mechanic_id: vehicle.mechanic_id ?? '',
            status: vehicle.status

        });


        setShowModal(true);

    }





    function saveVehicle(e){

        e.preventDefault();


        if(editingVehicle){


            router.put(
                `/admin/vehicles/${editingVehicle.id}`,
                form
            );


        }else{


            router.post(
                '/admin/vehicles',
                form
            );


        }


        setShowModal(false);

    }





    function deleteVehicle(id){


        if(confirm('Delete this vehicle?')){


            router.delete(
                `/admin/vehicles/${id}`
            );


        }


    }





    const filteredVehicles = vehicles.filter((vehicle)=>

        vehicle.license_plate
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        vehicle.brand
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        vehicle.model
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        vehicle.owner_name
            .toLowerCase()
            .includes(search.toLowerCase())

    );





    return (

        <AdminLayout>



            <div className="
                flex
                justify-between
                items-center
                mb-6
            ">


                <h1 className="
                    text-3xl
                    font-bold
                ">
                    Vehicles
                </h1>




                <PrimaryButton
                    onClick={openCreate}
                >

                    <Plus size={18}/>

                    Add Vehicle

                </PrimaryButton>



            </div>






            <AnimatedCard>


                <div className="mb-6">


                    <input

                        type="text"

                        value={search}

                        onChange={(e)=>
                            setSearch(e.target.value)
                        }

                        placeholder="
                            Search plate, brand, model or owner...
                        "

                        className="
                            w-full
                            md:w-1/3
                            border
                            rounded-xl
                            px-4
                            py-2
                        "

                    />


                </div>




                <div className="
                    overflow-x-auto
                ">


                    <table className="
                        min-w-full
                    ">


                        <thead>


                            <tr className="
                                bg-gray-50
                                border-b
                            ">


                                <th className="px-4 py-3 text-left">
                                    Plate
                                </th>


                                <th className="px-4 py-3 text-left">
                                    Vehicle
                                </th>


                                <th className="px-4 py-3 text-left">
                                    Owner
                                </th>


                                <th className="px-4 py-3 text-left">
                                    Mechanic
                                </th>


                                <th className="px-4 py-3 text-left">
                                    Status
                                </th>


                                <th className="px-4 py-3 text-center">
                                    Actions
                                </th>


                            </tr>


                        </thead>





                        <tbody>


                            <AnimatePresence>


                                {filteredVehicles.map((vehicle)=>(


                                    <motion.tr

                                        key={vehicle.id}

                                        initial={{
                                            opacity:0,
                                            y:10
                                        }}

                                        animate={{
                                            opacity:1,
                                            y:0
                                        }}

                                        exit={{
                                            opacity:0
                                        }}

                                        transition={{
                                            duration:0.2
                                        }}

                                        className="
                                            border-b
                                            hover:bg-gray-50
                                        "

                                    >


                                        <td className="px-4 py-3">

                                            {vehicle.license_plate}

                                        </td>


                                        <td className="px-4 py-3 font-medium">

                                            {vehicle.brand}

                                            {' '}

                                            {vehicle.model}

                                        </td>


                                        <td className="px-4 py-3">

                                            {vehicle.owner_name}

                                        </td>

                                        <td className="px-4 py-3">

                                            {
                                                vehicle.mechanic
                                                    ? vehicle.mechanic.name
                                                    : 'Unassigned'
                                            }

                                        </td>





                                        <td className="px-4 py-3">

                                            <span
                                                className={`
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-sm
                                                    font-medium

                                                    ${
                                                        vehicle.status === 'waiting'

                                                        ? 'bg-yellow-100 text-yellow-700'

                                                        : vehicle.status === 'repairing'

                                                        ? 'bg-blue-100 text-blue-700'

                                                        : 'bg-green-100 text-green-700'
                                                    }
                                                `}
                                            >

                                                {
                                                    vehicle.status
                                                        .charAt(0)
                                                        .toUpperCase()
                                                    +
                                                    vehicle.status.slice(1)
                                                }

                                            </span>


                                        </td>





                                        <td className="px-4 py-3">


                                            <div className="
                                                flex
                                                justify-center
                                                gap-3
                                            ">



                                                <button

                                                    onClick={()=>
                                                        openEdit(vehicle)
                                                    }

                                                    className="
                                                        p-2
                                                        rounded-xl
                                                        text-blue-600
                                                        hover:bg-blue-100
                                                    "

                                                    title="Edit vehicle"

                                                >

                                                    <Pencil size={18}/>

                                                </button>





                                                <button

                                                    onClick={()=>
                                                        deleteVehicle(vehicle.id)
                                                    }

                                                    className="
                                                        p-2
                                                        rounded-xl
                                                        text-red-600
                                                        hover:bg-red-100
                                                    "

                                                    title="Delete vehicle"

                                                >

                                                    <Trash2 size={18}/>

                                                </button>



                                            </div>


                                        </td>



                                    </motion.tr>


                                ))}


                            </AnimatePresence>


                        </tbody>


                    </table>


                </div>


            </AnimatedCard>









            <AnimatePresence>


                {showModal && (


                    <motion.div

                        initial={{
                            opacity:0
                        }}

                        animate={{
                            opacity:1
                        }}

                        exit={{
                            opacity:0
                        }}

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
                                shadow-xl
                            "

                        >



                            <h2 className="
                                text-2xl
                                font-bold
                                mb-5
                            ">


                                {
                                    editingVehicle
                                        ? 'Edit Vehicle'
                                        : 'Add Vehicle'
                                }


                            </h2>





                            <form
                                onSubmit={saveVehicle}
                                className="space-y-4"
                            >



                                {
                                    [
                                        ['license_plate','License Plate'],
                                        ['brand','Brand'],
                                        ['model','Model'],
                                        ['year','Year'],
                                        ['owner_name','Owner Name']
                                    ]
                                    .map(([key,placeholder])=>(


                                        <input

                                            key={key}

                                            placeholder={placeholder}

                                            value={form[key]}

                                            onChange={(e)=>
                                                setForm({
                                                    ...form,
                                                    [key]:e.target.value
                                                })
                                            }

                                            className="
                                                w-full
                                                border
                                                rounded-xl
                                                p-3
                                            "

                                        />


                                    ))
                                }






                                <select

                                    value={form.mechanic_id}

                                    onChange={(e)=>
                                        setForm({
                                            ...form,
                                            mechanic_id:e.target.value
                                        })
                                    }

                                    className="
                                        w-full
                                        border
                                        rounded-xl
                                        p-3
                                    "

                                >


                                    <option value="">
                                        Select mechanic
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

                                    value={form.status}

                                    onChange={(e)=>
                                        setForm({
                                            ...form,
                                            status:e.target.value
                                        })
                                    }

                                    className="
                                        w-full
                                        border
                                        rounded-xl
                                        p-3
                                    "

                                >


                                    <option value="waiting">
                                        Waiting
                                    </option>


                                    <option value="repairing">
                                        Repairing
                                    </option>


                                    <option value="completed">
                                        Completed
                                    </option>


                                </select>







                                <div className="
                                    flex
                                    justify-end
                                    gap-3
                                    pt-4
                                ">


                                    <button

                                        type="button"

                                        onClick={()=>
                                            setShowModal(false)
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