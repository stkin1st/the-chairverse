import React from 'react';
import { chairData } from '../data/chairs';

const CategoryShowcase = ({ setCurrentView, setSelectedCategory }) => {
    const categoryIcons = {
        'Work': '💼',
        'Living Room': '🛋️',
        'Dining': '🍽️',
        'Designer': '✨',
        'Outdoor': '🌳',
        'Traditional': '🏛️',
        'Specialty': '🎭',
        'Functional': '⚙️',
        'Medical': '🏥',
        'Entertainment': '🎬',
    };

    const categoryColors = {
        'Work': 'from-blue-400 to-indigo-500',
        'Living Room': 'from-purple-400 to-pink-500',
        'Dining': 'from-amber-400 to-orange-500',
        'Designer': 'from-rose-400 to-red-500',
        'Outdoor': 'from-green-400 to-emerald-500',
        'Traditional': 'from-yellow-400 to-amber-500',
        'Specialty': 'from-cyan-400 to-blue-500',
        'Functional': 'from-slate-400 to-gray-500',
        'Medical': 'from-teal-400 to-cyan-500',
        'Entertainment': 'from-fuchsia-400 to-purple-500',
    };

    return (
        <section className="py-16 bg-white/50">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-4xl font-black text-center mb-12">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                        Browse by Category
                    </span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.keys(categoryIcons).map((cat) => {
                        const count = chairData.filter(c => c.category === cat).length;
                        return (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setCurrentView('explorer');
                                }}
                                className={`relative p-6 rounded-2xl bg-gradient-to-br ${categoryColors[cat]} text-white shadow-lg hover:shadow-xl transform hover:scale-105 hover:-rotate-2 transition-all duration-300 group overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                                <div className="text-4xl mb-2">{categoryIcons[cat]}</div>
                                <div className="font-bold">{cat}</div>
                                <div className="text-sm opacity-80">{count} chairs</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
