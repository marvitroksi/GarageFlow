import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';


export default function CreateInventoryItem() {

    const { data, setData, post, processing } = useForm({

        name: '',
        category: '',
        quantity: 0,
        price: '',
        supplier: '',

    });


    function submit(e) {

        e.preventDefault();

        post('/admin/inventory');

    }


    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Add Inventory Item
            </h1>


            <div className="bg-white p-6 rounded-lg shadow max-w-xl">

                <form onSubmit={submit}>


                    <input
                        className="w-full border p-2 mb-4"
                        placeholder="Item name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-4"
                        placeholder="Category"
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-4"
                        type="number"
                        placeholder="Quantity"
                        value={data.quantity}
                        onChange={e => setData('quantity', e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-4"
                        type="number"
                        placeholder="Price"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                    />


                    <input
                        className="w-full border p-2 mb-6"
                        placeholder="Supplier (optional)"
                        value={data.supplier}
                        onChange={e => setData('supplier', e.target.value)}
                    />


                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save Item
                    </button>


                </form>

            </div>


        </AdminLayout>

    );

}