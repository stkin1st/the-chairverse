import React from 'react';
import { chairData } from '../data/chairs';

const FunFactsTicker = () => {
    const facts = chairData.map(c => `${c.image} ${c.name}: ${c.funFact}`);

    return (
        <section className="py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex gap-8">
                {[...facts, ...facts].map((fact, i) => (
                    <span key={i} className="text-white font-medium">
                        {fact} &nbsp;•&nbsp;
                    </span>
                ))}
            </div>
        </section>
    );
};

export default FunFactsTicker;
