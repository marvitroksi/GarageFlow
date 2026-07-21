import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';


export default function ShowPayment({ payment }) {


    return (

        <AdminLayout>


            <div className="flex justify-between items-center mb-6">


                <h1 className="text-3xl font-bold">
                    Payment #{payment.id}
                </h1>


                <Link
                    href="/admin/payments"
                    className="
                        bg-gray-200
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-gray-300
                    "
                >
                    Back
                </Link>


            </div>


            <div className="bg-white m-6 border-t p-6 rounded-lg shadow">


                <h2 className="text-xl font-bold mb-4">
                    Payment Information
                </h2>

                <p className="text-gray-700 mb-3">

                    Amount:

                    <span className="font-semibold ml-2">

                        €{Number(payment.amount).toFixed(2)}

                    </span>

                </p>

                <p className="text-gray-700 mb-3">

                    Method:

                    <span className="font-semibold ml-2 capitalize">

                        {payment.method}

                    </span>

                </p>

                <p className="text-gray-700">

                    Status:

                    <span
                        className="
                            ml-2
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            bg-green-100
                            text-green-700
                        "
                    >

                        {payment.status}

                    </span>

                </p>

                <h2 className="text-xl font-bold mt-4">
                    Service Order
                </h2>

                <p className="text-gray-700 mt-3">

                    Order:

                    <span className="font-semibold ml-2">

                        #{payment.service_order.id}

                    </span>

                </p>

                <p className="text-gray-700 mb-3">

                    Vehicle:

                    <span className="font-semibold ml-2">

                        {payment.service_order.vehicle.brand}

                        {' '}

                        {payment.service_order.vehicle.model}

                    </span>

                </p>

                <p className="text-gray-700">

                    Plate:

                    <span className="font-semibold ml-2">

                        {payment.service_order.vehicle.license_plate}

                    </span>

                </p>

                <h2 className="text-xl font-bold mt-4">
                    Notes
                </h2>

                <p className="text-gray-700">

                    {payment.notes || 'No notes available'}

                </p>


            </div>


        </AdminLayout>

    );

}