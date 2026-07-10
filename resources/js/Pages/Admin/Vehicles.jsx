import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

export default function Vehicles({ vehicles }) {
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

            <div className="bg-white p-6 rounded-lg shadow">

                <h2 className="text-xl font-semibold mb-4">
                    Vehicles
                </h2>

                {vehicles.length === 0 ? (

                    <p>No vehicles found.</p>

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

                                {vehicles.map((vehicle) => (

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

                                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                                Waiting
                                            </span>

                                        </td>

                                        <td className="py-3 px-4">

                                            <div className="flex justify-center items-center gap-4">

                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Edit vehicle"
                                                >
                                                    <Pencil size={18} />
                                                </button>

                                                <button
                                                    className="text-red-600 hover:text-red-800"
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