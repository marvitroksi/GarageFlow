import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function EditServiceOrderItem({ item }) {

    const { data, setData, put, processing, errors } = useForm({

        quantity: item.quantity,

    });


    function submit(e) {

        e.preventDefault();

        put(`/admin/service-order-items/${item.id}`);

    }


    return (

        <AdminLayout>

            <div className="max-w-xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    Edit Part
                </h1>


                <div className="bg-white p-6 rounded-lg shadow">


                    <div className="mb-5">

                        <label className="block font-medium mb-2">
                            Inventory Item
                        </label>


                        <input
                            type="text"
                            value={item.inventory_item.name}
                            disabled
                            className="w-full border p-2 rounded bg-gray-100"
                        />

                    </div>



                    <form onSubmit={submit}>


                        <div className="mb-5">

                            <label className="block font-medium mb-2">
                                Quantity
                            </label>


                            <input
                                type="number"
                                min="0"
                                className="w-full border p-2 rounded"
                                value={data.quantity}
                                onChange={(e) =>
                                    setData(
                                        'quantity',
                                        e.target.value
                                    )
                                }
                            />


                            {errors.quantity && (

                                <p className="text-red-600 text-sm mt-1">
                                    {errors.quantity}
                                </p>

                            )}

                        </div>



                        <div className="flex gap-3">


                            <button
                                disabled={processing}
                                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                            >
                                Save Changes
                            </button>


                            <Link
                                href={`/admin/service-orders/${item.service_order_id}`}
                                className="bg-gray-200 px-5 py-2 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </Link>


                        </div>


                    </form>


                </div>


            </div>


        </AdminLayout>

    );

}