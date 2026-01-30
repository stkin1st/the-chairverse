import React, { useMemo } from 'react';
import { chairData } from '../data/chairs';

const FeaturedChairs = ({ setCurrentView, setSelectedChair }) => {
    const featured = useMemo(() => {
        // Determine a "random" but stable set of chairs so it doesn't flicker on re-render
        // For a real app we might pick specifically or use a seed
        // Here we'll just pick carefully or reproduce the shuffle once
        const shuffled = [...chairData].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 6);
    }, []);

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-4xl font-black text-center mb-4">
                    <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                        ✨ Chair of the Day
                    </span>
                </h3>
                <p className="text-center text-gray-600 mb-12">Discover something new every visit!</p>

                <div className="grid md:grid-cols-3 gap-6">
                    {featured.map((chair, i) => (
                        <button
                            key={chair.id}
                            onClick={() => {
                                setSelectedChair(chair);
                                setCurrentView('detail');
                            }}
                            className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-left"
                        >
                            <div
                                className="w-full h-40 rounded-2xl flex items-center justify-center text-7xl mb-4 group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: chair.color + '20' }}
                            >
                                {chair.image}
                            </div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800 group-hover:text-orange-500 transition-colors">
                                        {chair.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">{chair.category} • {chair.era}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-orange-500">${chair.price}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedChairs;
