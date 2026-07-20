import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function AddServiceOrderItem({ serviceOrder, inventoryItems }) {

    const { data, setData, post, processing } = useForm({

        inventory_item_id: '',
        quantity: 1,

    });

    function submit(e) {

        e.preventDefault();

        post(`/admin/service-orders/${serviceOrder.id}/items`);

    }

    return (

        <AdminLayout>

            <div className="max-w-xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    Add Part
                </h1>

                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded-lg shadow"
                >

                    <div className="mb-5">

                        <label className="block font-medium mb-2">
                            Inventory Item
                        </label>

                        <select
                            className="w-full border p-2 rounded"
                            value={data.inventory_item_id}
                            onChange={(e) =>
                                setData('inventory_item_id', e.target.value)
                            }
                        >

                            <option value="">
                                Select Item
                            </option>

                            {inventoryItems.map(item => (

                                <option
                                    key={item.id}
                                    value={item.id}
                                >

                                    {item.name} ({item.stock_quantity} in stock)

                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="mb-6">

                        <label className="block font-medium mb-2">
                            Quantity
                        </label>

                        <input
                            type="number"
                            min="1"
                            className="w-full border p-2 rounded"
                            value={data.quantity}
                            onChange={(e) =>
                                setData('quantity', e.target.value)
                            }
                        />

                    </div>

                    <div className="flex gap-3">

                        <button
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                        >
                            Add Part
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

        </AdminLayout>

    );

}