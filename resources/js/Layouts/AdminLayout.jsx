import { Link } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen flex">

            <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">

                <h1 className="text-2xl font-bold mb-8">
                    GarageFlow
                </h1>

                <div className="flex flex-col gap-4">

                    <Link href="/admin/dashboard">
                        Dashboard
                    </Link>

                    <Link href="/admin/employees">
                        Employees
                    </Link>

                    <Link href="/admin/vehicles">
                        Vehicles
                    </Link>

                    <Link href="/admin/service-orders">
                        Service Orders
                    </Link>

                    <Link href="/admin/inventory">
                        Inventory
                    </Link>

                    <Link href="admin/payments">
                        Payments
                    </Link>

                </div>

            </aside>


            <main className="flex-1 bg-gray-100 p-8">

                {children}

            </main>

        </div>
    );
}