import React, { useEffect, useState } from 'react';
import { UnitSystem } from '../types';

interface ResultDisplayProps {
  value: string;
  label: string;
  subLabel?: string;
  unit?: UnitSystem | string;
  isLanguageChanging?: boolean;
  languageKey?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  value, 
  label, 
  subLabel, 
  unit, 
  isLanguageChanging = false,
  languageKey = ''
}) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (value !== prevValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setPrevValue(value);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 transition-colors duration-300">
      <div 
        key={`label-${languageKey}`}
        className={`text-stone-400 dark:text-stone-500 text-xs font-semibold uppercase tracking-[0.2em] mb-2 transition-all duration-300 ${
          isLanguageChanging ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
        }`}
        style={{
          transform: isLanguageChanging 
            ? 'translate3d(0, 8px, 0)' 
            : 'translate3d(0, 0, 0)',
          WebkitTransform: isLanguageChanging 
            ? 'translate3d(0, 8px, 0)' 
            : 'translate3d(0, 0, 0)'
        }}
      >
        {label}
      </div>
      <div className="relative min-h-[120px] flex items-center justify-center">
        <div 
          className={`text-7xl md:text-8xl font-bold text-amber-500 tracking-tighter tabular-nums drop-shadow-sm dark:drop-shadow-2xl transition-all duration-300 ease-out ${
            isAnimating 
              ? 'opacity-0 transform translate-y-4 scale-95' 
              : 'opacity-100 transform translate-y-0 scale-100'
          }`}
          style={{ 
            transform: isAnimating 
              ? 'translate3d(0, 16px, 0) scale(0.95)' 
              : 'translate3d(0, 0, 0) scale(1)',
            WebkitTransform: isAnimating 
              ? 'translate3d(0, 16px, 0) scale(0.95)' 
              : 'translate3d(0, 0, 0) scale(1)'
          }}
        >
          {displayValue}
          <span className="text-2xl md:text-3xl text-stone-400 dark:text-stone-600 ml-2 font-medium">
            {unit}
          </span>
        </div>
      </div>
      {subLabel && (
        <div 
          key={`sublabel-${languageKey}`}
          className={`mt-4 text-stone-500 dark:text-stone-400 text-sm text-center max-w-xs leading-relaxed transition-all duration-300 ${
            isAnimating || isLanguageChanging ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
          }`}
          style={{
            transform: (isAnimating || isLanguageChanging) 
              ? 'translate3d(0, 8px, 0)' 
              : 'translate3d(0, 0, 0)',
            WebkitTransform: (isAnimating || isLanguageChanging) 
              ? 'translate3d(0, 8px, 0)' 
              : 'translate3d(0, 0, 0)'
          }}
        >
          {subLabel}
        </div>
      )}
    </div>
  );
};