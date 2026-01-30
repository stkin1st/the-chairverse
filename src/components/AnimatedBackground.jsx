import React from 'react';

const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50" />
        {[...Array(20)].map((_, i) => (
            <div
                key={i}
                className="absolute text-6xl opacity-10 animate-float"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${15 + Math.random() * 10}s`,
                }}
            >
                🪑
            </div>
        ))}
    </div>
);

export default AnimatedBackground;
