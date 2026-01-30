import React from 'react';

const ChairCard = ({ chair, onClick, isWishlisted, toggleWishlist }) => (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <button
            onClick={(e) => {
                e.stopPropagation();
                toggleWishlist();
            }}
            className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-400 hover:text-pink-500'
                }`}
        >
            {isWishlisted ? '💖' : '🤍'}
        </button>

        <button onClick={onClick} className="w-full text-left">
            <div
                className="h-48 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundColor: chair.color + '15' }}
            >
                {chair.image}
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                        {chair.name}
                    </h4>
                </div>
                <p className="text-sm text-gray-500 mb-3">{chair.category} • {chair.era}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-500">${chair.price}</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                        View Details →
                    </span>
                </div>
            </div>
        </button>
    </div>
);

export default ChairCard;
