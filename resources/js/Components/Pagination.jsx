import React from 'react';
import { Link } from '@inertiajs/react';

const Pagination = ({ links }) => {
    return (
        <div className="flex justify-center space-x-1">
            {links.map((link, index) => {
                if (link.url === null) {
                    return (
                        <div
                            key={index}
                            className="px-4 py-2 border rounded-md bg-white text-gray-700"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }
                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-4 py-2 border rounded-md ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
};

export default Pagination;
