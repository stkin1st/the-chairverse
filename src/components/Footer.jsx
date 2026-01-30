import React from 'react';

const Footer = () => (
    <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-3">
                    <span className="text-4xl">🪑</span>
                    <div>
                        <h3 className="text-2xl font-black">CHAIRVERSE</h3>
                        <p className="text-gray-400 text-sm">The Ultimate Chair Experience</p>
                    </div>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-gray-400 mb-2">Featuring <span className="text-orange-400 font-bold">83 unique chair types</span></p>
                    <p className="text-gray-500 text-sm">From ancient thrones to modern masterpieces</p>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
                <p>Made with 🧡 for chair enthusiasts everywhere</p>
                <p className="text-sm mt-2">© 2024 Chairverse - Not a real store, just a celebration of chairs!</p>
            </div>
        </div>
    </footer>
);

export default Footer;
