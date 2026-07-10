import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function CreateEmployee() {

    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });


    function submit(e) {
        e.preventDefault();
        post('/admin/employees');
    }


    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Add Mechanic
            </h1>


            <form onSubmit={submit} className="space-y-4">

                <input
                    className="border p-2 w-full"
                    placeholder="Name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                />


                <input
                    className="border p-2 w-full"
                    placeholder="Email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                />


                <input
                    className="border p-2 w-full"
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                />


                <button
                    className="bg-green-600 text-white px-5 py-2 rounded"
                >
                    Create Mechanic
                </button>

            </form>

        </AdminLayout>
    );
}