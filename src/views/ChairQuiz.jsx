import React, { useState } from 'react';
import { chairData } from '../data/chairs';

const ChairQuiz = ({ setSelectedChair, setCurrentView }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const questions = [
        {
            question: "Where will you primarily use this chair?",
            icon: "🏠",
            options: [
                { label: "Home Office", value: "work", emoji: "💻" },
                { label: "Living Room", value: "living", emoji: "🛋️" },
                { label: "Dining Area", value: "dining", emoji: "🍽️" },
                { label: "Outdoors", value: "outdoor", emoji: "🌳" },
            ]
        },
        {
            question: "What's your budget range?",
            icon: "💰",
            options: [
                { label: "Under $200", value: "budget", emoji: "🪙" },
                { label: "$200 - $500", value: "mid", emoji: "💵" },
                { label: "$500 - $1000", value: "premium", emoji: "💎" },
                { label: "No limit!", value: "luxury", emoji: "👑" },
            ]
        },
        {
            question: "What's most important to you?",
            icon: "⭐",
            options: [
                { label: "Comfort", value: "comfort", emoji: "😴" },
                { label: "Style", value: "style", emoji: "✨" },
                { label: "Functionality", value: "function", emoji: "⚙️" },
                { label: "Uniqueness", value: "unique", emoji: "🎨" },
            ]
        },
        {
            question: "Pick a vibe!",
            icon: "🎭",
            options: [
                { label: "Modern & Minimal", value: "modern", emoji: "🔲" },
                { label: "Classic & Timeless", value: "classic", emoji: "🏛️" },
                { label: "Bold & Playful", value: "bold", emoji: "🌈" },
                { label: "Cozy & Comfortable", value: "cozy", emoji: "🧸" },
            ]
        }
    ];

    const calculateResult = () => {
        // Simple matching algorithm
        let filtered = [...chairData];

        // Filter by location
        if (answers.location === 'work') {
            filtered = filtered.filter(c => ['Work', 'Functional'].includes(c.category));
        } else if (answers.location === 'living') {
            filtered = filtered.filter(c => ['Living Room', 'Designer'].includes(c.category));
        } else if (answers.location === 'dining') {
            filtered = filtered.filter(c => c.category === 'Dining');
        } else if (answers.location === 'outdoor') {
            filtered = filtered.filter(c => c.category === 'Outdoor');
        }

        // Filter by budget
        if (answers.budget === 'budget') {
            filtered = filtered.filter(c => c.price < 200);
        } else if (answers.budget === 'mid') {
            filtered = filtered.filter(c => c.price >= 200 && c.price < 500);
        } else if (answers.budget === 'premium') {
            filtered = filtered.filter(c => c.price >= 500 && c.price < 1000);
        }

        // If too few results, relax filters
        if (filtered.length < 3) {
            filtered = chairData.filter(c => {
                if (answers.budget === 'budget') return c.price < 300;
                if (answers.budget === 'mid') return c.price < 700;
                return true;
            });
        }

        // Get top 3 random matches
        const shuffled = filtered.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    };

    const handleAnswer = (value) => {
        const newAnswers = { ...answers, [questions[step].question]: value };
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Calculate result
            const matches = calculateResult();
            setResult(matches);
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers({});
        setResult(null);
    };

    if (result) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">
                        Your Perfect Chairs!
                    </h2>
                    <p className="text-gray-600">Based on your preferences, we think you'll love these:</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {result.map((chair, i) => (
                        <button
                            key={chair.id}
                            onClick={() => {
                                setSelectedChair(chair);
                                setCurrentView('detail');
                            }}
                            className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-left relative overflow-hidden"
                        >
                            {i === 0 && (
                                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    Top Pick! 🏆
                                </div>
                            )}
                            <div
                                className="h-40 rounded-2xl flex items-center justify-center text-6xl mb-4 group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: chair.color + '15' }}
                            >
                                {chair.image}
                            </div>
                            <h3 className="font-bold text-xl text-gray-800 group-hover:text-orange-500">
                                {chair.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2">{chair.category}</p>
                            <p className="text-2xl font-bold text-orange-500">${chair.price}</p>
                        </button>
                    ))}
                </div>

                <div className="text-center space-x-4">
                    <button
                        onClick={resetQuiz}
                        className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-full hover:bg-gray-200 transition-all"
                    >
                        🔄 Take Quiz Again
                    </button>
                    <button
                        onClick={() => setCurrentView('explorer')}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition-all"
                    >
                        🔍 Explore All Chairs
                    </button>
                </div>
            </div>
        );
    }

    const currentQ = questions[step];

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Question {step + 1} of {questions.length}</span>
                    <span>{Math.round(((step + 1) / questions.length) * 100)}% Complete</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                        style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{currentQ.icon}</div>
                    <h2 className="text-3xl font-black text-gray-800">{currentQ.question}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {currentQ.options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(option.value)}
                            className="p-6 bg-gray-50 rounded-2xl hover:bg-amber-50 hover:border-amber-500 border-2 border-transparent transition-all duration-300 transform hover:scale-105 group"
                        >
                            <div className="text-4xl mb-2 group-hover:scale-125 transition-transform">
                                {option.emoji}
                            </div>
                            <div className="font-bold text-gray-800 group-hover:text-amber-600">
                                {option.label}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChairQuiz;
