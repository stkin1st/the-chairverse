import React from 'react';
import { chairData } from '../data/chairs';

const ChairDetail = ({ chair, setCurrentView, wishlist, toggleWishlist }) => {
    if (!chair) return null;

    const relatedChairs = chairData
        .filter(c => c.category === chair.category && c.id !== chair.id)
        .slice(0, 4);

    const isWishlisted = wishlist.includes(chair.id);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <button onClick={() => setCurrentView('home')} className="hover:text-orange-500">Home</button>
                <span>/</span>
                <button onClick={() => setCurrentView('explorer')} className="hover:text-orange-500">Explorer</button>
                <span>/</span>
                <span className="text-gray-800 font-medium">{chair.name}</span>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="md:flex">
                    {/* Image Section */}
                    <div
                        className="md:w-1/2 h-96 md:h-auto flex items-center justify-center text-9xl p-12"
                        style={{ backgroundColor: chair.color + '15' }}
                    >
                        <span className="transform hover:scale-110 hover:rotate-12 transition-all duration-500 cursor-pointer">
                            {chair.image}
                        </span>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 p-8">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span
                                    className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-3"
                                    style={{ backgroundColor: chair.color }}
                                >
                                    {chair.category}
                                </span>
                                <h1 className="text-4xl font-black text-gray-800">{chair.name}</h1>
                                <p className="text-gray-500 mt-1">{chair.era} Era</p>
                            </div>
                        </div>

                        <p className="text-gray-600 text-lg mb-6">{chair.description}</p>

                        {/* Fun Fact */}
                        <div className="bg-amber-50 rounded-2xl p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">💡</span>
                                <div>
                                    <div className="font-bold text-amber-800 mb-1">Fun Fact!</div>
                                    <p className="text-amber-700">{chair.funFact}</p>
                                </div>
                            </div>
                        </div>

                        {/* Best For */}
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-800 mb-2">Best For:</h3>
                            <div className="flex flex-wrap gap-2">
                                {chair.bestFor.map((use, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                    >
                                        {use}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-sm text-gray-500">Starting from</div>
                                    <div className="text-4xl font-black text-orange-500">${chair.price}</div>
                                </div>
                                <button
                                    onClick={() => toggleWishlist(chair.id)}
                                    className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${isWishlisted
                                            ? 'bg-pink-500 text-white'
                                            : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
                                        }`}
                                >
                                    {isWishlisted ? '💖 In Wishlist' : '🤍 Add to Wishlist'}
                                </button>
                            </div>
                            <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                🛒 Shop This Style
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Chairs */}
            {relatedChairs.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-2xl font-black text-gray-800 mb-6">More {chair.category} Chairs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedChairs.map(related => (
                            <button
                                key={related.id}
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-left"
                            >
                                <div
                                    className="h-32 rounded-xl flex items-center justify-center text-5xl mb-3"
                                    style={{ backgroundColor: related.color + '15' }}
                                >
                                    {related.image}
                                </div>
                                <h4 className="font-bold text-gray-800 text-sm">{related.name}</h4>
                                <p className="text-orange-500 font-bold">${related.price}</p>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* SEO-friendly structured data hint */}
            <div className="mt-8 text-center text-gray-400 text-sm">
                <p>Chair ID: #{chair.id} | Category: {chair.category} | Era: {chair.era}</p>
            </div>
        </div>
    );
};

export default ChairDetail;
