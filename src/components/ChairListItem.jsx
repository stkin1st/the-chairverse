import React from 'react';

const ChairListItem = ({ chair, onClick, isWishlisted, toggleWishlist }) => (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <button onClick={onClick} className="w-full flex items-center gap-6 p-4 text-left">
            <div
                className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: chair.color + '15' }}
            >
                {chair.image}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg text-gray-800 group-hover:text-orange-500 transition-colors">
                    {chair.name}
                </h4>
                <p className="text-sm text-gray-500 mb-1">{chair.category} • {chair.era}</p>
                <p className="text-sm text-gray-600 line-clamp-1">{chair.description}</p>
            </div>
            <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-orange-500 mb-2">${chair.price}</div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist();
                    }}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
                        }`}
                >
                    {isWishlisted ? '💖 Saved' : '🤍 Save'}
                </button>
            </div>
        </button>
    </div>
);

export default ChairListItem;
