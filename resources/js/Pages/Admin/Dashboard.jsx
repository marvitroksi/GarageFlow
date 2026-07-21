import AdminLayout from '@/Layouts/AdminLayout';
import {
    Car,
    Wrench,
    CheckCircle,
    Euro
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export default function Dashboard({
    stats,
    recentOrders,
    lowStockItems,
    statusChart
}) {


    return (

        <AdminLayout>


            <div className="mb-6">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Garage overview and statistics
                </p>

            </div>



            {/* Statistics Cards */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
            ">


                <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">

                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">

                        <Car size={28}/>

                    </div>


                    <div>

                        <p className="text-gray-500 text-sm">
                            Vehicles
                        </p>


                        <h2 className="text-3xl font-bold">
                            {stats.vehicles}
                        </h2>

                    </div>

                </div>





                <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">

                    <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">

                        <Wrench size={28}/>

                    </div>


                    <div>

                        <p className="text-gray-500 text-sm">
                            Active Repairs
                        </p>


                        <h2 className="text-3xl font-bold">
                            {stats.activeRepairs}
                        </h2>

                    </div>

                </div>





                <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">

                    <div className="bg-green-100 text-green-600 p-3 rounded-lg">

                        <CheckCircle size={28}/>

                    </div>


                    <div>

                        <p className="text-gray-500 text-sm">
                            Completed
                        </p>


                        <h2 className="text-3xl font-bold">
                            {stats.completedRepairs}
                        </h2>

                    </div>

                </div>





                <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">

                    <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">

                        <Euro size={28}/>

                    </div>


                    <div>

                        <p className="text-gray-500 text-sm">
                            Revenue
                        </p>


                        <h2 className="text-3xl font-bold">
                            €{Number(stats.revenue).toFixed(2)}
                        </h2>

                    </div>

                </div>


            </div>

            <div className="mt-8 bg-white rounded-lg shadow p-6">

                <h2 className="text-xl font-bold mb-5">
                    Repair Status
                </h2>


                <div className="h-72">

                    <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                            <Pie
                                data={statusChart}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >

                                {statusChart.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            [
                                                '#9CA3AF', // Pending - gray
                                                '#F59E0B', // In Progress - yellow
                                                '#10B981'  // Completed - green
                                            ][index]
                                        }
                                    />

                                ))}

                            </Pie>


                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* Recent Orders */}

            <div className="mt-8 bg-white rounded-lg shadow p-6">


                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-xl font-bold">
                        Recent Service Orders
                    </h2>


                    <Link
                        href="/admin/service-orders"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        View all
                    </Link>

                </div>



                {recentOrders.length === 0 ? (

                    <p className="text-gray-500">
                        No service orders yet.
                    </p>

                ) : (

                    <div className="space-y-4">


                        {recentOrders.map((order) => (

                            <div
                                key={order.id}
                                className="
                                    border
                                    rounded-lg
                                    p-4
                                    flex
                                    justify-between
                                    items-center
                                    hover:bg-gray-50
                                    transition
                                "
                            >


                                <div>


                                    <h3 className="font-semibold text-lg">

                                        {order.vehicle.brand}
                                        {' '}
                                        {order.vehicle.model}

                                    </h3>



                                    <p className="text-sm text-gray-500">

                                        Plate:
                                        {' '}
                                        {order.vehicle.license_plate}

                                    </p>



                                    <p className="text-sm mt-2">

                                        🔧 {order.description}

                                    </p>



                                    <p className="text-sm text-gray-500">

                                        Mechanic:
                                        {' '}
                                        {order.mechanic
                                            ? order.mechanic.name
                                            : 'Unassigned'}

                                    </p>


                                </div>




                                <span
                                    className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium

                                        ${
                                            order.status === 'completed'
                                            ? 'bg-green-100 text-green-700'
                                            :
                                            order.status === 'in_progress'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            :
                                            'bg-gray-100 text-gray-700'
                                        }

                                    `}
                                >

                                    {order.status === 'in_progress'
                                        ? 'In Progress'
                                        : order.status.charAt(0).toUpperCase()
                                        + order.status.slice(1)
                                    }

                                </span>


                            </div>

                        ))}


                    </div>

                )}


            </div>





            {/* Low Stock */}


            <div className="mt-8 bg-white rounded-lg shadow p-6">


                <h2 className="text-xl font-bold mb-4">
                    Low Stock Alerts
                </h2>



                {lowStockItems.length === 0 ? (

                    <p className="text-gray-500">
                        Inventory levels are good.
                    </p>

                ) : (


                    <div className="space-y-3">


                        {lowStockItems.map((item) => (

                            <div
                                key={item.id}
                                className="
                                    flex
                                    justify-between
                                    border-b
                                    pb-2
                                "
                            >

                                <span>
                                    {item.name}
                                </span>


                                <span className="text-red-600 font-medium">

                                    {item.quantity} left

                                </span>


                            </div>

                        ))}


                    </div>


                )}


            </div>


        </AdminLayout>

    );

}