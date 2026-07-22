import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';


export default function CreateVehicle({ mechanics }) {


    const {
        data,
        setData,
        post,
        processing,
        errors

    } = useForm({

        license_plate: '',
        brand: '',
        model: '',
        year: '',
        owner_name: '',
        mechanic_id: '',
        status: 'waiting',

    });





    function submit(e){

        e.preventDefault();

        post('/admin/vehicles');

    }





    return (

        <AdminLayout>


            <h1 className="text-3xl font-bold mb-6">
                Add Vehicle
            </h1>





            {Object.keys(errors).length > 0 && (

                <div className="
                    bg-red-100
                    text-red-700
                    p-4
                    rounded-lg
                    mb-6
                ">

                    {Object.values(errors).map((error,index)=>(

                        <p key={index}>
                            {error}
                        </p>

                    ))}

                </div>

            )}






            <div className="
                bg-white
                p-6
                rounded-lg
                shadow
                max-w-xl
            ">


                <form onSubmit={submit}>



                    <input

                        className="
                            w-full
                            border
                            p-2
                            mb-4
                        "

                        placeholder="License Plate"

                        value={data.license_plate}

                        onChange={e =>
                            setData(
                                'license_plate',
                                e.target.value
                            )
                        }

                    />





                    <input

                        className="
                            w-full
                            border
                            p-2
                            mb-4
                        "

                        placeholder="Brand"

                        value={data.brand}

                        onChange={e =>
                            setData(
                                'brand',
                                e.target.value
                            )
                        }

                    />





                    <input

                        className="
                            w-full
                            border
                            p-2
                            mb-4
                        "

                        placeholder="Model"

                        value={data.model}

                        onChange={e =>
                            setData(
                                'model',
                                e.target.value
                            )
                        }

                    />





                    <input

                        className="
                            w-full
                            border
                            p-2
                            mb-4
                        "

                        placeholder="Year"

                        value={data.year}

                        onChange={e =>
                            setData(
                                'year',
                                e.target.value
                            )
                        }

                    />





                    <input

                        className="
                            w-full
                            border
                            p-2
                            mb-4
                        "

                        placeholder="Owner Name"

                        value={data.owner_name}

                        onChange={e =>
                            setData(
                                'owner_name',
                                e.target.value
                            )
                        }

                    />







                    <select

                        className="
                            w-full
                            border
                            p-2
                            mb-4
                        "

                        value={data.mechanic_id}

                        onChange={e =>
                            setData(
                                'mechanic_id',
                                e.target.value
                            )
                        }

                    >

                        <option value="">
                            Assign Mechanic
                        </option>


                        {mechanics.map(mechanic => (

                            <option

                                key={mechanic.id}

                                value={mechanic.id}

                            >

                                {mechanic.name}

                            </option>

                        ))}


                    </select>







                    <select

                        className="
                            w-full
                            border
                            p-2
                            mb-6
                        "

                        value={data.status}

                        onChange={e =>
                            setData(
                                'status',
                                e.target.value
                            )
                        }

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







                    <button

                        type="submit"

                        disabled={processing}

                        className="
                            bg-blue-600
                            text-white
                            px-4
                            py-2
                            rounded
                            disabled:opacity-50
                        "

                    >

                        {processing
                            ? 'Saving...'
                            : 'Save Vehicle'
                        }

                    </button>




                </form>


            </div>



        </AdminLayout>

    );

}