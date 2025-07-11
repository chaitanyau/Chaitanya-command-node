import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_DATA, RESUME_DATA } from '../constants';
import { getAiResponse } from '../lib/ai';


interface ContactProps {
    contact: typeof CONTACT_DATA;
    resume: typeof RESUME_DATA;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [response, setResponse] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setResponse('');
        try {
            const aiResponse = await getAiResponse(formData);
            setResponse(aiResponse);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Gemini API Error:", error);
            setResponse('// TRANSMISSION FAILED: Anomaly detected in the network. Please use an alternative communication channel.');
            setStatus('error');
        }
    };

    return (
        <div className="p-8 rounded-lg bg-brand-bg/80 backdrop-blur-lg border border-brand-border h-full flex flex-col">
            <h3 className="font-orbitron text-2xl text-brand-light mb-6">// OPEN CHANNEL</h3>
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                <div className="space-y-4 flex-grow">
                    <div>
                        <label htmlFor="name" className="font-source-code text-sm text-brand-primary">CALLSIGN / NAME</label>
                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} aria-label="Your name or callsign" className="w-full bg-brand-dark border border-brand-border rounded-md p-2 mt-1 text-brand-light font-source-code focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                     <div>
                        <label htmlFor="email" className="font-source-code text-sm text-brand-primary">COORDINATES / EMAIL</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} aria-label="Your email address" className="w-full bg-brand-dark border border-brand-border rounded-md p-2 mt-1 text-brand-light font-source-code focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                     <div>
                        <label htmlFor="message" className="font-source-code text-sm text-brand-primary">TRANSMISSION / MESSAGE</label>
                        <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={5} aria-label="Your message" className="w-full bg-brand-dark border border-brand-border rounded-md p-2 mt-1 text-brand-light font-source-code focus:outline-none focus:ring-2 focus:ring-brand-primary"></textarea>
                    </div>
                </div>
                 <button type="submit" disabled={status === 'loading'} className="mt-6 w-full text-center px-8 py-3 font-orbitron font-bold bg-brand-primary text-brand-dark border-2 border-brand-primary hover:bg-transparent hover:text-brand-primary transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                    {status === 'loading' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                </button>
            </form>
            <AnimatePresence>
            {response && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 p-3 rounded-md font-source-code text-sm ${status === 'success' ? 'bg-blue-900/50 text-blue-300' : 'bg-red-900/50 text-red-300'}`}
                    role={status === 'success' ? 'status' : 'alert'}
                 >
                    <p className='font-bold mb-1'>{status === 'success' ? '>> RESPONSE RECEIVED:' : '>> SYSTEM ALERT:'}</p>
                    <p>{response}</p>
                 </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};


export const Contact: React.FC<ContactProps> = ({ contact, resume }) => {
    const contactLinks = [
        { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
        { label: "GitHub", value: contact.github, href: contact.github },
        { label: "LinkedIn", value: contact.linkedin, href: contact.linkedin },
        { label: "Blog", value: contact.blog, href: contact.blog },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-12">
                <div className="p-8 rounded-lg bg-brand-bg/80 backdrop-blur-lg border border-brand-border">
                    <h3 className="font-orbitron text-2xl text-brand-light mb-6">// SECURE CHANNELS</h3>
                    <div className="space-y-4 font-source-code">
                        {contactLinks.map(link => (
                            <div key={link.label}>
                                <p className="text-brand-primary font-bold">{link.label}:</p>
                                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:text-brand-light break-all transition-colors">{link.value}</a>
                            </div>
                        ))}
                         <div>
                            <p className="text-brand-primary font-bold">Command Base:</p>
                            <p className="text-brand-secondary">{contact.base}</p>
                        </div>
                    </div>
                </div>
                 <div className="p-8 rounded-lg bg-brand-bg/80 backdrop-blur-lg border border-brand-border">
                     <h3 className="font-orbitron text-2xl text-brand-light mb-6">// ACCESS DOSSIER</h3>
                     <p className="font-source-code text-brand-secondary mb-6">{resume.objective}</p>
                     <div className="flex flex-col sm:flex-row gap-4">
  <a 
    href={resume.downloadLink} 
    download="../docs/ChaitanyaUpadhyay_T_Resume_Light.pdf"
    className="inline-block w-full sm:w-auto text-center px-8 py-3 font-orbitron font-bold bg-brand-accent text-brand-dark border-2 border-brand-accent hover:bg-transparent hover:text-brand-accent transition-all duration-300 rounded-md"
  >
    DOWNLOAD RESUME 1 [PDF]
  </a>

  <a 
    href={resume.downloadLink} 
    download="../docs/ChaitanyaUpadhyay_T_Resume_Dark.pdf"
    className="inline-block w-full sm:w-auto text-center px-8 py-3 font-orbitron font-bold bg-purple-600 text-white border-2 border-purple-600 hover:bg-transparent hover:text-purple-600 transition-all duration-300 rounded-md"
  >
    DOWNLOAD RESUME 2 [PDF]
  </a>
</div>

                </div>
            </div>
            <ContactForm />
        </div>
    );
};