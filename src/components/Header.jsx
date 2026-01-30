import React from 'react';

const Header = ({ currentView, setCurrentView, wishlist }) => (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b-4 border-amber-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setCurrentView('home')}
                    className="flex items-center gap-3 group"
                >
                    <div className="text-5xl transform group-hover:rotate-12 transition-transform duration-300">🪑</div>
                    <div>
                        <h1 className="text-2xl font-black bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                            CHAIRVERSE
                        </h1>
                        <p className="text-xs font-bold text-gray-500 tracking-widest">THE ULTIMATE CHAIR EXPERIENCE</p>
                    </div>
                </button>

                <nav className="flex items-center gap-2">
                    {[
                        { id: 'home', label: '🏠 Home', color: 'amber' },
                        { id: 'explorer', label: '🔍 Explorer', color: 'orange' },
                        { id: 'quiz', label: '🎯 Chair Quiz', color: 'rose' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentView(item.id)}
                            className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${currentView === item.id
                                    ? `bg-${item.color}-500 text-white scale-105 shadow-lg`
                                    : `bg-${item.color}-100 text-${item.color}-700 hover:bg-${item.color}-200 hover:scale-105`
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentView('wishlist')}
                        className="relative px-4 py-2 rounded-full font-bold text-sm bg-pink-100 text-pink-700 hover:bg-pink-200 hover:scale-105 transition-all duration-300"
                    >
                        💝 Wishlist
                        {wishlist.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                                {wishlist.length}
                            </span>
                        )}
                    </button>
                </nav>
            </div>
        </div>
    </header>
);

export default Header;
