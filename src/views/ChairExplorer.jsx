import React, { useState, useMemo } from 'react';
import { chairData, categories, eras } from '../data/chairs';
import ChairCard from '../components/ChairCard';
import ChairListItem from '../components/ChairListItem';

const ChairExplorer = ({ selectedCategory, setSelectedCategory, setSelectedChair, setCurrentView, wishlist, toggleWishlist }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEra, setSelectedEra] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');

    const filteredChairs = useMemo(() => {
        return chairData
            .filter(chair => {
                const matchesSearch = chair.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    chair.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = selectedCategory === 'All' || chair.category === selectedCategory;
                const matchesEra = selectedEra === 'All' || chair.era === selectedEra;
                return matchesSearch && matchesCategory && matchesEra;
            })
            .sort((a, b) => {
                if (sortBy === 'name') return a.name.localeCompare(b.name);
                if (sortBy === 'price-low') return a.price - b.price;
                if (sortBy === 'price-high') return b.price - a.price;
                return 0;
            });
    }, [searchTerm, selectedCategory, selectedEra, sortBy]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Search & Filters */}
            <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Search */}
                    <div className="flex-1 min-w-64">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search 83 chairs... 🔍"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-3 rounded-full border-2 border-amber-200 focus:border-amber-500 focus:outline-none text-lg"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-3 rounded-full border-2 border-orange-200 focus:border-orange-500 focus:outline-none font-medium bg-white"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat === 'All' ? '📁 All Categories' : cat}</option>
                        ))}
                    </select>

                    {/* Era Filter */}
                    <select
                        value={selectedEra}
                        onChange={(e) => setSelectedEra(e.target.value)}
                        className="px-4 py-3 rounded-full border-2 border-rose-200 focus:border-rose-500 focus:outline-none font-medium bg-white"
                    >
                        {eras.map(era => (
                            <option key={era} value={era}>{era === 'All' ? '📅 All Eras' : era}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none font-medium bg-white"
                    >
                        <option value="name">📝 A-Z</option>
                        <option value="price-low">💰 Price: Low-High</option>
                        <option value="price-high">💎 Price: High-Low</option>
                    </select>

                    {/* View Toggle */}
                    <div className="flex rounded-full overflow-hidden border-2 border-gray-200">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-amber-500 text-white' : 'bg-white'}`}
                        >
                            ▦
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 ${viewMode === 'list' ? 'bg-amber-500 text-white' : 'bg-white'}`}
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* Results count */}
                <div className="mt-4 text-gray-600">
                    Showing <span className="font-bold text-orange-500">{filteredChairs.length}</span> of {chairData.length} chairs
                </div>
            </div>

            {/* Chair Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredChairs.map(chair => (
                        <ChairCard
                            key={chair.id}
                            chair={chair}
                            onClick={() => {
                                setSelectedChair(chair);
                                setCurrentView('detail');
                            }}
                            isWishlisted={wishlist.includes(chair.id)}
                            toggleWishlist={() => toggleWishlist(chair.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredChairs.map(chair => (
                        <ChairListItem
                            key={chair.id}
                            chair={chair}
                            onClick={() => {
                                setSelectedChair(chair);
                                setCurrentView('detail');
                            }}
                            isWishlisted={wishlist.includes(chair.id)}
                            toggleWishlist={() => toggleWishlist(chair.id)}
                        />
                    ))}
                </div>
            )}

            {filteredChairs.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No chairs found!</h3>
                    <p className="text-gray-600">Try adjusting your filters or search term</p>
                </div>
            )}
        </div>
    );
};

export default ChairExplorer;
