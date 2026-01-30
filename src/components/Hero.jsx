import React, { useMemo } from 'react';
import { chairData } from '../data/chairs';

const Hero = ({ setCurrentView }) => {
    // Use a stable slice for the showcase
    const showcaseChairs = useMemo(() => chairData.slice(0, 8), []);

    return (
        <section className="relative py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                    <div className="inline-block animate-bounce-slow mb-6">
                        <span className="text-8xl">🪑</span>
                    </div>
                    <h2 className="text-6xl md:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                            Every Chair
                        </span>
                        <br />
                        <span className="text-gray-800">Has a Story</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Discover <span className="font-bold text-orange-500">83 unique chair types</span> from ancient thrones to modern masterpieces.
                        Find your perfect seat in the universe of chairs!
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        <button
                            onClick={() => setCurrentView('explorer')}
                            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            🔍 Explore All Chairs
                        </button>
                        <button
                            onClick={() => setCurrentView('quiz')}
                            className="px-8 py-4 bg-white text-orange-500 font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-orange-500 flex items-center gap-2"
                        >
                            🎯 Take the Chair Quiz
                        </button>
                    </div>

                    {/* Floating Chair Showcase */}
                    <div className="flex justify-center gap-4 flex-wrap">
                        {showcaseChairs.map((chair, i) => (
                            <div
                                key={chair.id}
                                className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer"
                                style={{ animationDelay: `${i * 0.1}s` }}
                                title={chair.name}
                            >
                                {chair.image}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
