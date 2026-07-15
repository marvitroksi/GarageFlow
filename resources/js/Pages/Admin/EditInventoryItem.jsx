import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';


export default function EditInventoryItem({ item }) {

    const { data, setData, put, processing } = useForm({

        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        supplier: item.supplier || '',

    });


    function submit(e) {

        e.preventDefault();

        put(`/admin/inventory/${item.id}`);

    }


    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Edit Inventory Item
            </h1>


            <div className="bg-white p-6 rounded-lg shadow max-w-xl">

                <form onSubmit={submit}>


                    <input
                        className="w-full border p-2 mb-4"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-4"
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-4"
                        type="number"
                        value={data.quantity}
                        onChange={e => setData('quantity', e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-4"
                        type="number"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-6"
                        value={data.supplier}
                        onChange={e => setData('supplier', e.target.value)}
                    />


                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save Changes
                    </button>


                </form>

            </div>

        </AdminLayout>

    );

}