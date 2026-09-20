import React, { useState } from 'react';
import { HiShoppingCart } from 'react-icons/hi2';
import { LuPackage } from 'react-icons/lu';

export default function AddToCartButton({ onSuccess }) {
  const [status, setStatus] = useState('idle');

  const handleClick = (e) => {
    e.stopPropagation();
    if (status !== 'idle') return;
    setStatus('animating');
    setTimeout(() => {
      if (onSuccess) onSuccess();
      setStatus('idle');
    }, 1500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={status !== 'idle'}
      className="relative w-full h-11 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 bg-[#A8653F] hover:bg-[#8F5332] text-white transition-all duration-300 shadow-sm overflow-hidden shrink-0 active:scale-95"
    >
      {status === 'idle' && (
        <>
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <span className="whitespace-nowrap">Add to Cart</span>
        </>
      )}

      {status === 'animating' && (
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div className="absolute top-0.5 animate-[dropItem_1.5s_infinite] z-10 text-amber-200">
            <LuPackage className="w-4 h-4 drop-shadow" />
          </div>
          <div className="absolute left-0 animate-[driveCart_1.5s_linear_infinite]">
            <HiShoppingCart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs opacity-75 font-medium">Adding...</span>
        </div>
      )}
      <style>{`
       @keyframes driveCart {
  0% { transform: translateX(-20px); }
  100% { transform: translateX(260px); }
}

@keyframes dropItem {
  0% { transform: translateY(-16px) scale(0.6); opacity: 0; }
  35% { opacity: 1; transform: translateY(2px) scale(1); }
  70% { opacity: 0; transform: translateY(12px) scale(0.7); }
  100% { opacity: 0; }
}
      `}</style>
    </button>
    
  );
}