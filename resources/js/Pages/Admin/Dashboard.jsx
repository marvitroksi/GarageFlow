import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="p-6">
                <h1 className="text-3xl font-bold">
                    GarageFlow Admin Dashboard
                </h1>

                <p className="mt-2">
                    Welcome Admin
                </p>
            </div>

        </AdminLayout>
    );
}

{/* export default function Dashboard() {
    return (
        <div className="bg-red-500 text-white text-5xl p-10">
            Tailwind Test
        </div>
    );
} */}
