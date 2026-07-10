import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function EditEmployee({ mechanic }) {

    const { data, setData, put, processing, errors } = useForm({
        name: mechanic.name,
        email: mechanic.email,
        password: '',
    });


    const submit = (e) => {
        e.preventDefault();

        put(`/admin/employees/${mechanic.id}`);
    };


    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Edit Mechanic
            </h1>


            <div className="bg-white p-6 rounded-lg shadow max-w-xl">

                <form onSubmit={submit}>

                    <div className="mb-4">

                        <label className="block mb-2">
                            Name
                        </label>

                        <input
                            className="w-full border rounded p-2"
                            value={data.name}
                            onChange={(e)=>setData('name', e.target.value)}
                        />

                    </div>


                    <div className="mb-4">

                        <label className="block mb-2">
                            Email
                        </label>

                        <input
                            className="w-full border rounded p-2"
                            value={data.email}
                            onChange={(e)=>setData('email', e.target.value)}
                        />

                    </div>


                    <div className="mb-4">

                        <label className="block mb-2">
                            New Password (optional)
                        </label>

                        <input
                            type="password"
                            className="w-full border rounded p-2"
                            value={data.password}
                            onChange={(e)=>setData('password', e.target.value)}
                        />

                    </div>


                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>


                </form>

            </div>


        </AdminLayout>
    );
}