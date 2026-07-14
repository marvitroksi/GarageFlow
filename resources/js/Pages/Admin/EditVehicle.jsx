import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function EditVehicle({ vehicle, mechanics }) {

    const { data, setData, put, processing } = useForm({

        license_plate: vehicle.license_plate,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        owner_name: vehicle.owner_name,
        mechanic_id: vehicle.mechanic_id,
        status: vehicle.status,

    });

    function submit(e) {

        e.preventDefault();

        put(`/admin/vehicles/${vehicle.id}`);

    }

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Edit Vehicle
            </h1>

            <div className="bg-white p-6 rounded-lg shadow max-w-xl">

                <form onSubmit={submit}>

                    <input
                        className="w-full border p-2 mb-4"
                        value={data.license_plate}
                        onChange={e => setData('license_plate', e.target.value)}
                    />

                    <input
                        className="w-full border p-2 mb-4"
                        value={data.brand}
                        onChange={e => setData('brand', e.target.value)}
                    />

                    <input
                        className="w-full border p-2 mb-4"
                        value={data.model}
                        onChange={e => setData('model', e.target.value)}
                    />

                    <input
                        className="w-full border p-2 mb-4"
                        value={data.year}
                        onChange={e => setData('year', e.target.value)}
                    />

                    <input
                        className="w-full border p-2 mb-4"
                        value={data.owner_name}
                        onChange={e => setData('owner_name', e.target.value)}
                    />

                    <select
                        className="w-full border p-2 mb-4"
                        value={data.mechanic_id}
                        onChange={e => setData('mechanic_id', e.target.value)}
                    >

                        {mechanics.map((mechanic) => (

                            <option
                                key={mechanic.id}
                                value={mechanic.id}
                            >
                                {mechanic.name}
                            </option>

                        ))}

                    </select>

                    <select
                        className="w-full border p-2 mb-6"
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
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
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save Changes
                    </button>

                </form>

            </div>

        </AdminLayout>

    );

}