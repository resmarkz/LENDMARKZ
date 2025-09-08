import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

const Edit = ({ auth }) => {
    return (
        <Layout auth={auth}>
            <Head title="Edit Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1>Edit Profile Page</h1>
                            <p>This is where you can edit your profile information.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Edit;