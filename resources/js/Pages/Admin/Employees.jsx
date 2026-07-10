import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';


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

                <h2 className="text-xl font-semibold mb-4">
                    Mechanics
                </h2>

                {mechanics.length === 0 ? (
                    <p>No mechanics found.</p>
                ) : (
                    <ul>
                        {mechanics.map((mechanic) => (
                            <li key={mechanic.id}>
                                {mechanic.name} - {mechanic.email}
                            </li>
                        ))}
                    </ul>
                )}

            </div>

            

        </AdminLayout>
    );
}