import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react'

export default function Employees({ mechanics }) {

    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Employees
            </h1>

            <Link
                href="/admin/employees/create"
                className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-6"
>
                Add Mechanic
            </Link>
            
            <div className="bg-white p-6 rounded-lg shadow">

                <div className="bg-white p-6 rounded-lg shadow">

                    <h2 className="text-xl font-semibold mb-4">
                        Mechanics
                    </h2>

                        {mechanics.length === 0 ? (

                            <p>No mechanics found.</p>

                         ) : (

                        <div className="overflow-x-auto">

                            <table className="min-w-full border-collapse">  

                                <thead>

                                    <tr className="border-b">

                                        <th className="text-left py-3 px-4">Name</th>
                                        <th className="text-left py-3 px-4">Email</th>
                                        <th className="text-left py-3 px-4">Status</th>
                                        <th className="text-center py-3 px-4">Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {mechanics.map((mechanic) => (

                                        <tr
                                                key={mechanic.id}
                                                className="border-b hover:bg-gray-50">

                                            <td className="py-3 px-4">
                                                {mechanic.name}
                                            </td>

                                            <td className="py-3 px-4">
                                                {mechanic.email}
                                            </td>

                                            <td className="py-3 px-4">

                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                    Available
                                                </span>

                                            </td>

                                            <td className="py-3 px-4 text-center">
                                                <div className="flex justify-center items-center gap-4">

                                                    <Link
                                                        href={`/admin/employees/${mechanic.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-800 mr-4"
                                                    >
                                                        <Pencil size={18}/>
                                                    </Link>

                                                    <button
                                                        onClick={() => {
                                                            if(confirm(`Delete ${mechanic.name}?`)) {
                                                                router.delete(`/admin/employees/${mechanic.id}`);
                                                            }
                                                        }}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Delete mechanic"
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

            </div>

            

        </AdminLayout>
    );
}