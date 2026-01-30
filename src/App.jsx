import React, { useState } from 'react';
import './index.css';

// Components
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FunFactsTicker from './components/FunFactsTicker';

// Views
import CategoryShowcase from './views/CategoryShowcase';
import FeaturedChairs from './views/FeaturedChairs';
import ChairExplorer from './views/ChairExplorer';
import ChairDetail from './views/ChairDetail';
import ChairQuiz from './views/ChairQuiz';
import WishlistPage from './views/WishlistPage';

export default function App() {
    const [currentView, setCurrentView] = useState('home');
    const [selectedChair, setSelectedChair] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = (chairId) => {
        setWishlist(prev =>
            prev.includes(chairId)
                ? prev.filter(id => id !== chairId)
                : [...prev, chairId]
        );
    };

    return (
        <div className="min-h-screen">
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-float { animation: float 15s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-marquee { animation: marquee 60s linear infinite; }
        .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
      `}</style>

            <AnimatedBackground />

            <Header
                currentView={currentView}
                setCurrentView={setCurrentView}
                wishlist={wishlist}
            />

            <main>
                {currentView === 'home' && (
                    <>
                        <Hero setCurrentView={setCurrentView} />
                        <FunFactsTicker />
                        <CategoryShowcase
                            setCurrentView={setCurrentView}
                            setSelectedCategory={setSelectedCategory}
                        />
                        <FeaturedChairs
                            setCurrentView={setCurrentView}
                            setSelectedChair={setSelectedChair}
                        />
                    </>
                )}

                {currentView === 'explorer' && (
                    <ChairExplorer
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        setSelectedChair={setSelectedChair}
                        setCurrentView={setCurrentView}
                        wishlist={wishlist}
                        toggleWishlist={toggleWishlist}
                    />
                )}

                {currentView === 'detail' && (
                    <ChairDetail
                        chair={selectedChair}
                        setCurrentView={setCurrentView}
                        wishlist={wishlist}
                        toggleWishlist={toggleWishlist}
                    />
                )}

                {currentView === 'quiz' && (
                    <ChairQuiz
                        setSelectedChair={setSelectedChair}
                        setCurrentView={setCurrentView}
                    />
                )}

                {currentView === 'wishlist' && (
                    <WishlistPage
                        wishlist={wishlist}
                        toggleWishlist={toggleWishlist}
                        setSelectedChair={setSelectedChair}
                        setCurrentView={setCurrentView}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}
