import React from 'react';
import { FOOTER_DATA } from '../constants';

interface FooterProps {
    data: typeof FOOTER_DATA;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
    return (
        <footer className="relative z-20 text-center py-12 px-4 mt-24 border-t border-brand-border">
            <div className="max-w-4xl mx-auto font-source-code">
                <p className="text-brand-secondary">{data.line1}</p>
                <p className="text-brand-secondary mt-1">{data.line2}<span className="text-brand-light font-bold">{data.line2bold}</span></p>
                <blockquote className="my-8 italic text-brand-light/90 border-l-2 border-brand-primary pl-4 text-left max-w-2xl mx-auto">
                    <p>{data.quote}</p>
                    <cite className="block text-right mt-2 not-italic text-brand-secondary">{data.author}</cite>
                </blockquote>
            </div>
        </footer>
    );
};