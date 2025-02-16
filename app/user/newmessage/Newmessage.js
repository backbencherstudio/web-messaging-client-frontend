'use client';

import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function NewMessageForm() {
    const [formData, setFormData] = useState({ name: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="flex justify-center    lg:pt-[188px] dark:bg-[url('/bg.png')] md:pt-[156px] pt-[121px] bg-cover bg-no-repeat">
            <div className="max-w-[1080px] w-full px-5 2xl:px-0 md:pb-[115px] pb-[104px] leading-[130%]">
                <h1 className="text-[#070707] dark:text-[#FDFEFF] font-medium md:text-[28px] text-2xl lg:text-[32px] leading-[130%]">New Message!</h1>

                <div className='border dark:border-[#545460] p-5 mt-2 rounded-xl'>
                <form onSubmit={handleSubmit} className="mt-2 space-y-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Who are you?"
                        value={formData.name}
                        onChange={handleChange}
                        className="md:p-6 px-4 py-6 md:px-6 border dark:border-[#545460] rounded-[16px] md:mt-8 mt-6 dark:bg-custom-gradient w-full"
                        required
                    />

                    <textarea
                        name="message"
                        placeholder="What's your message?"
                        value={formData.message}
                        onChange={handleChange}
                        className="md:p-6 px-4 py-6 md:px-6 border dark:border-[#545460] rounded-[16px] md:mt-8 mt-6 dark:bg-custom-gradient w-full"
                        rows="4"
                        required
                    ></textarea>
<div className="flex flex-col sm:flex-row gap-4">
    <button
        type="submit"
        className="flex-1 flex items-center justify-center gap-2 p-4 bg-black text-white rounded-full dark:bg-[#FDFEFF] dark:text-black"
    >
        <FaPaperPlane /> Free Submit Message
    </button>
    <button
        type="button"
        className="flex-1 p-4 bg-gray-300 text-gray-600 rounded-full cursor-not-allowed dark:bg-[#070707] dark:text-[#FDFEFF]"
        disabled
    >
        Pay & Submit Message
    </button>
</div>

                </form>

                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    [ Note: After submitting 50 messages, further submissions will require payment at the current value. ]
                </p>

                <div className="mt-6 flex justify-end gap-2  p-4 ">
                    <div className=''>
                        <span className="text-[#070707] dark:text-gray-300 font-medium">Payment Options:</span>
                        <div className="flex gap-2 mt-2">
                            <img src="/visa-icon-2048x1313-o6hi8q5l.png" alt="Visa" className="h-6" />
                            <img src="/mastercard-icon-2048x1286-s6y46dfh.png" alt="Mastercard" className="h-6" />
                            <img src="/images.jpg" alt="Discover" className="h-6" />
                            <img src="/image_processing20250206-349039-19g3b5c.gif" alt="Stripe" className="h-6" />
                            <img src="/paypal-app-icon-payment-platform-paypal-app-icon-payment-platform-vector-illustration-financial-application-307045425.webp" alt="PayPal" className="h-6" />
                            <img src="/5968245.png" alt="Amex" className="h-6" />
                        </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
    );
}
