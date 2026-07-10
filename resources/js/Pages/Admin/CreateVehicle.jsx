import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';


export default function CreateVehicle({ mechanics }) {


    const { data, setData, post, processing } = useForm({

        license_plate: '',
        brand: '',
        model: '',
        year: '',
        owner_name: '',
        mechanic_id: '',

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


            <div className="bg-white p-6 rounded-lg shadow max-w-xl">


                <form onSubmit={submit}>


                    <input
                        className="w-full border p-2 mb-4"
                        placeholder="License Plate"
                        onChange={e=>setData('license_plate',e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-4"
                        placeholder="Brand"
                        onChange={e=>setData('brand',e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-4"
                        placeholder="Model"
                        onChange={e=>setData('model',e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-4"
                        placeholder="Year"
                        onChange={e=>setData('year',e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-4"
                        placeholder="Owner Name"
                        onChange={e=>setData('owner_name',e.target.value)}
                    />


                    <select
                        className="w-full border p-2 mb-4"
                        onChange={e=>setData('mechanic_id',e.target.value)}
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


                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Save Vehicle
                    </button>


                </form>


            </div>


        </AdminLayout>

    );
}