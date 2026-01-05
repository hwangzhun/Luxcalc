import React from 'react';

interface ContinuousControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  unit?: string;
  isLanguageChanging?: boolean;
  languageKey?: string;
}

export const ContinuousControl: React.FC<ContinuousControlProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit,
  isLanguageChanging = false,
  languageKey = ''
}) => {
  return (
    <div className="flex flex-col space-y-3 p-4 bg-white dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm dark:shadow-none transition-all duration-300 ease-out hover:shadow-md dark:hover:shadow-lg">
      <div className="flex justify-between items-center">
        <label 
          key={`label-${languageKey}`}
          className={`text-stone-500 dark:text-stone-400 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
            isLanguageChanging ? 'opacity-0 transform translate-x-2' : 'opacity-100 transform translate-x-0'
          }`}
          style={{
            transform: isLanguageChanging 
              ? 'translate3d(8px, 0, 0)' 
              : 'translate3d(0, 0, 0)',
            WebkitTransform: isLanguageChanging 
              ? 'translate3d(8px, 0, 0)' 
              : 'translate3d(0, 0, 0)'
          }}
        >
          {label}
        </label>
        <span 
          key={value}
          className="text-stone-900 dark:text-stone-100 font-mono text-lg transition-all duration-200 ease-out transform"
          style={{ 
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)'
          }}
        >
          {value} <span className="text-stone-400 dark:text-stone-500 text-sm">{unit}</span>
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all duration-200"
      />
      
       <div className="flex justify-between text-[10px] text-stone-400 dark:text-stone-600 font-mono px-1 transition-colors duration-300">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};