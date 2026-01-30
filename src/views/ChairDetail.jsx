import React, { useState } from 'react';
import { chairData } from '../data/chairs';
import { chairContent } from '../data/chairContent';

const ChairDetail = ({ chair, setCurrentView, wishlist, toggleWishlist, setSelectedChair }) => {
    if (!chair) return null;

    // Generate slug from chair name to match chairContent keys
    // e.g., "Office Chair" → "office-chair", "Poäng Chair" → "poang-chair"
    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/ä/g, 'a')
            .replace(/ö/g, 'o')
            .replace(/ü/g, 'u')
            .replace(/'/g, '')              // Remove apostrophes
            .replace(/'/g, '')              // Remove smart quotes
            .replace(/\s+/g, '-')           // Replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, '');    // Remove any other special characters
    };

    const chairSlug = generateSlug(chair.name);
    
    // Get SEO content for this chair
    const seoContent = chairContent[chairSlug] || {};
    
    // Get similar chairs using the numeric IDs from chairContent
    const similarChairs = seoContent.similarChairIds 
        ? seoContent.similarChairIds
            .map(id => chairData.find(c => c.id === id))
            .filter(Boolean)
            .slice(0, 4)
        : chairData
            .filter(c => c.category === chair.category && c.id !== chair.id)
            .slice(0, 4);

    const isWishlisted = wishlist.includes(chair.id);
    
    // FAQ Accordion state
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <button onClick={() => setCurrentView('home')} className="hover:text-orange-500">Home</button>
                <span>/</span>
                <button onClick={() => setCurrentView('explorer')} className="hover:text-orange-500">Explorer</button>
                <span>/</span>
                <span className="text-gray-800 font-medium">{chair.name}</span>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="md:flex">
                    {/* Image Section */}
                    <div
                        className="md:w-1/2 h-96 md:h-auto flex items-center justify-center text-9xl p-12"
                        style={{ backgroundColor: chair.color + '15' }}
                    >
                        <span className="transform hover:scale-110 hover:rotate-12 transition-all duration-500 cursor-pointer">
                            {chair.image}
                        </span>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 p-8">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span
                                    className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-3"
                                    style={{ backgroundColor: chair.color }}
                                >
                                    {chair.category}
                                </span>
                                <h1 className="text-4xl font-black text-gray-800">{chair.name}</h1>
                                <p className="text-gray-500 mt-1">{chair.era} Era</p>
                            </div>
                        </div>

                        <p className="text-gray-600 text-lg mb-6">{chair.description}</p>

                        {/* Fun Fact */}
                        <div className="bg-amber-50 rounded-2xl p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">💡</span>
                                <div>
                                    <div className="font-bold text-amber-800 mb-1">Fun Fact!</div>
                                    <p className="text-amber-700">{chair.funFact}</p>
                                </div>
                            </div>
                        </div>

                        {/* Best For - Original Tags */}
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-800 mb-2">Best For:</h3>
                            <div className="flex flex-wrap gap-2">
                                {chair.bestFor.map((use, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                    >
                                        {use}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-sm text-gray-500">Starting from</div>
                                    <div className="text-4xl font-black text-orange-500">${chair.price}</div>
                                </div>
                                <button
                                    onClick={() => toggleWishlist(chair.id)}
                                    className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${isWishlisted
                                            ? 'bg-pink-500 text-white'
                                            : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
                                        }`}
                                >
                                    {isWishlisted ? '💖 In Wishlist' : '🤍 Add to Wishlist'}
                                </button>
                            </div>
                            <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                🛒 Shop This Style
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEW: Expanded "Perfect For" Section */}
            {seoContent.expandedBestFor && (
                <section className="mt-12 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8">
                    <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                        <span>🎯</span> Perfect For
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {seoContent.expandedBestFor}
                    </p>
                </section>
            )}

            {/* NEW: FAQ Section */}
            {seoContent.faqs && seoContent.faqs.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
                        <span>❓</span> Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                        {seoContent.faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                            >
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-bold text-gray-800 pr-4">{faq.question}</span>
                                    <span className={`text-orange-500 text-xl transition-transform duration-300 flex-shrink-0 ${
                                        openFaqIndex === index ? 'rotate-180' : ''
                                    }`}>
                                        ▼
                                    </span>
                                </button>
                                {openFaqIndex === index && (
                                    <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* NEW: Similar Chairs (replacing "Related Chairs" with SEO-powered version) */}
            {similarChairs.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-2xl font-black text-gray-800 mb-6">
                        {seoContent.similarChairIds ? 'Similar Chairs You Might Love' : `More ${chair.category} Chairs`}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {similarChairs.map(related => (
                            <button
                                key={related.id}
                                onClick={() => {
                                    setSelectedChair(related);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-left"
                            >
                                <div
                                    className="h-32 rounded-xl flex items-center justify-center text-5xl mb-3"
                                    style={{ backgroundColor: related.color + '15' }}
                                >
                                    {related.image}
                                </div>
                                <h4 className="font-bold text-gray-800 text-sm">{related.name}</h4>
                                <p className="text-orange-500 font-bold">${related.price}</p>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* SEO-friendly structured data */}
            <div className="mt-8 text-center text-gray-400 text-sm">
                <p>Chair ID: #{chair.id} | Category: {chair.category} | Era: {chair.era}</p>
            </div>
        </div>
    );
};

export default ChairDetail;
