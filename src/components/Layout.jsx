import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-2">
                        <span className="block text-indigo-600">Mocky</span>
                        <span className="block text-2xl font-medium text-gray-500 mt-1">Dummy Data Generator</span>
                    </h1>
                    <p className="mt-2 text-base text-gray-500">
                        Generate realistic JSON datasets for your next project instantly.
                    </p>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
