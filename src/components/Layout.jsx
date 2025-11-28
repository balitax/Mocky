import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl w-full space-y-12">
                <div className="text-center animate-fade-in-up">
                    <h1 className="text-6xl font-black tracking-tight mb-4">
                        <span className="gradient-text">Mocky</span>
                    </h1>
                    <h2 className="text-2xl font-semibold text-slate-700 mb-3">
                        Dummy Data Generator
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Generate realistic JSON datasets for your next project instantly. 
                        Perfect for testing, development, and prototyping.
                    </p>
                </div>
                <div className="animate-fade-in-up">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
