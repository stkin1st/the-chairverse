import React from 'react';
import { chairData } from '../data/chairs';

const WishlistPage = ({ wishlist, toggleWishlist, setSelectedChair, setCurrentView }) => {
    const wishlistChairs = chairData.filter(c => wishlist.includes(c.id));
    const totalValue = wishlistChairs.reduce((sum, c) => sum + c.price, 0);

    if (wishlistChairs.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <div className="text-8xl mb-6">💝</div>
                <h2 className="text-3xl font-black text-gray-800 mb-4">Your Wishlist is Empty!</h2>
                <p className="text-gray-600 mb-8">Start adding chairs you love to see them here.</p>
                <button
                    onClick={() => setCurrentView('explorer')}
                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                    🔍 Explore Chairs
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-gray-800">💝 My Wishlist</h2>
                    <p className="text-gray-500">{wishlistChairs.length} chairs saved</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500">Total Value</div>
                    <div className="text-3xl font-black text-orange-500">${totalValue.toLocaleString()}</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistChairs.map(chair => (
                    <div key={chair.id} className="bg-white rounded-3xl shadow-lg overflow-hidden group">
                        <button
                            onClick={() => {
                                setSelectedChair(chair);
                                setCurrentView('detail');
                            }}
                            className="w-full text-left"
                        >
                            <div
                                className="h-48 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: chair.color + '15' }}
                            >
                                {chair.image}
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-500">
                                    {chair.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">{chair.category}</p>
                                <div className="text-xl font-bold text-orange-500">${chair.price}</div>
                            </div>
                        </button>
                        <div className="px-5 pb-5">
                            <button
                                onClick={() => toggleWishlist(chair.id)}
                                className="w-full py-2 bg-pink-100 text-pink-500 rounded-full font-medium hover:bg-pink-200 transition-all"
                            >
                                Remove from Wishlist
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
