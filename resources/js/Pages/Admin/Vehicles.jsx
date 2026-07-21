import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Vehicles({ vehicles }) {

    const [search, setSearch] = useState('');

    function handleDelete(id) {

        if(confirm('Are you sure you want to delete this vehicle?')) {

            router.delete(`/admin/vehicles/${id}`);

        }

    }

    const filteredVehicles = vehicles.filter((vehicle) =>
        vehicle.license_plate.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.owner_name.toLowerCase().includes(search.toLowerCase())
    );
    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Vehicles
                </h1>

                <Link
                    href="/admin/vehicles/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Vehicle
                </Link>

            </div>

            <div className="mb-6">

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by plate, brand, model or owner..."
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

            <div className="bg-white p-6 rounded-lg shadow">

                <h2 className="text-xl font-semibold mb-4">
                    Vehicles
                </h2>

                {filteredVehicles.length === 0 ? (

                    <div className="text-center py-10">

                        <p className="text-gray-500 text-lg mb-4">
                            No vehicles found.
                        </p>

                        <Link
                             href="/admin/vehicles/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                                Add your first vehicle
                        </Link>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="min-w-full border-collapse">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-3 px-4">Plate</th>
                                    <th className="text-left py-3 px-4">Vehicle</th>
                                    <th className="text-left py-3 px-4">Owner</th>
                                    <th className="text-left py-3 px-4">Mechanic</th>
                                    <th className="text-left py-3 px-4">Status</th>
                                    <th className="text-center py-3 px-4">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredVehicles.map((vehicle) => (

                                    <tr
                                        key={vehicle.id}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="py-3 px-4">
                                            {vehicle.license_plate}
                                        </td>

                                        <td className="py-3 px-4">
                                            {vehicle.brand} {vehicle.model}
                                        </td>

                                        <td className="py-3 px-4">
                                            {vehicle.owner_name}
                                        </td>

                                        <td className="py-3 px-4">
                                            {vehicle.mechanic?.name ?? 'Unassigned'}
                                        </td>

                                        <td className="py-3 px-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    vehicle.status === 'waiting'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : vehicle.status === 'repairing'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                    }`}
                                            >
                                                {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                                            </span>

                                        </td>

                                        <td className="py-3 px-4">

                                            <div className="flex justify-center items-center gap-4">

                                                <Link
                                                    href={`/admin/vehicles/${vehicle.id}/edit`}
                                                    className="p-2 rounded hover:bg-blue-100 text-blue-600"
                                                    title="Edit vehicle"
                                                >
                                                    <Pencil size={18} />
                                                </Link>
                                                

                                                <button
                                                    onClick={() => handleDelete(vehicle.id)}
                                                    className="p-2 rounded hover:bg-red-100 text-red-600"
                                                    title="Delete vehicle"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </AdminLayout>
    );
}