import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';


export default function Inventory({ items }) {

    const [search, setSearch] = useState('');

    function deleteItem(id) {

        if (confirm('Delete this inventory item?')) {
            router.delete(`/admin/inventory/${id}`);
        }

    }

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.supplier?.toLowerCase().includes(search.toLowerCase())
    );


    return (

        <AdminLayout>


            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Inventory
                </h1>


                <Link
                    href="/admin/inventory/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Item
                </Link>

            </div>

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="Search inventory..."
                    className="w-full border rounded-lg p-3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="bg-white rounded-lg shadow p-6">


                <h2 className="text-xl font-semibold mb-4">
                    Stock Items
                </h2>



                {items.length === 0 ? (

                    <p className='text-gray-500 text-center py-6'>
                        No inventory items found.
                    </p>

                ) : (


                    <table className="w-full">


                        <thead>

                            <tr className="border-b">


                                <th className="text-left py-3">
                                    Name
                                </th>


                                <th className="text-left py-3">
                                    Category
                                </th>


                                <th className="text-left py-3">
                                    Status
                                </th>


                                <th className="text-left py-3">
                                    Quantity
                                </th>


                                <th className="text-left py-3">
                                    Price
                                </th>


                                <th className="text-left py-3">
                                    Supplier
                                </th>


                                <th className="text-left py-3">
                                    Actions
                                </th>


                            </tr>

                        </thead>



                        <tbody>


                            {filteredItems.map((item) => (


                                <tr
                                    key={item.id}
                                    className="border-b"
                                >


                                    <td className="py-3">
                                        {item.name}
                                    </td>



                                    <td className="py-3">
                                        {item.category}
                                    </td>



                                    <td className="py-3">


                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                item.quantity >= 20
                                                    ? 'bg-green-100 text-green-700'
                                                    : item.quantity >= 5
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {item.quantity >= 20
                                                ? 'In Stock'
                                                : item.quantity >= 5
                                                    ? 'Low Stock'
                                                    : 'Critical'}
                                        </span>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.quantity} units available
                                        </p>


                                    </td>




                                    <td className="py-3">
                                        {item.quantity}
                                    </td>




                                    <td className="py-3">
                                        €{item.price}
                                    </td>




                                    <td className="py-3">
                                        {item.supplier || '-'}
                                    </td>




                                    <td className="py-3">


                                        <div className="flex justify-center items-center gap-4">


                                            <Link
                                                href={`/admin/inventory/${item.id}/edit`}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit item"
                                            >
                                                <Pencil size={18} />
                                            </Link>



                                            <button
                                                onClick={() => deleteItem(item.id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete item"
                                            >
                                                <Trash2 size={18} />
                                            </button>



                                        </div>


                                    </td>


                                </tr>


                            ))}


                        </tbody>


                    </table>


                )}


            </div>


        </AdminLayout>

    );

}