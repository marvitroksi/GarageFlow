import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function CreatePayment({ serviceOrder }) {

    const { data, setData, post, processing, errors } = useForm({

        amount: '',

        status: 'paid',

        notes: '',

    });



    function submit(e) {

        e.preventDefault();

        post(`/admin/service-orders/${serviceOrder.id}/payments`);

    }



    return (

        <AdminLayout>

            <div className="max-w-xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    Add Payment
                </h1>


                <div className="bg-white p-6 rounded-lg shadow">


                    <p className="mb-5 text-gray-700">

                        Service Order:

                        {' '}

                        #{serviceOrder.id}

                    </p>



                    <form onSubmit={submit}>


                        <div className="mb-5">

                            <label className="block font-medium mb-2">
                                Amount
                            </label>


                            <input
                                type="number"
                                step="0.01"
                                className="w-full border p-2 rounded"
                                value={data.amount}
                                onChange={(e) =>
                                    setData(
                                        'amount',
                                        e.target.value
                                    )
                                }
                            />


                            {errors.amount && (

                                <p className="text-red-600 text-sm mt-1">
                                    {errors.amount}
                                </p>

                            )}

                        </div>



                        <div className="mb-5">

                            <label className="block font-medium mb-2">
                                Status
                            </label>


                            <select

                                className="w-full border p-2 rounded"

                                value={data.status}

                                onChange={(e) =>
                                    setData(
                                        'status',
                                        e.target.value
                                    )
                                }

                            >

                                <option value="paid">
                                    Paid
                                </option>


                                <option value="pending">
                                    Pending
                                </option>


                            </select>

                        </div>



                        <div className="mb-5">

                            <label className="block font-medium mb-2">
                                Notes
                            </label>


                            <textarea

                                className="w-full border p-2 rounded"

                                value={data.notes}

                                onChange={(e) =>
                                    setData(
                                        'notes',
                                        e.target.value
                                    )
                                }

                            />

                        </div>



                        <div className="flex gap-3">


                            <button

                                disabled={processing}

                                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"

                            >

                                Save Payment

                            </button>



                            <Link

                                href={`/admin/service-orders/${serviceOrder.id}`}

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