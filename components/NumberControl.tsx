import React from 'react';

interface NumberControlProps {
  label: string;
  value: number;
  options: number[];
  onChange: (val: number) => void;
  unit?: string;
  isLanguageChanging?: boolean;
  languageKey?: string;
}

export const NumberControl: React.FC<NumberControlProps> = ({ 
  label, 
  value, 
  options, 
  onChange,
  unit,
  isLanguageChanging = false,
  languageKey = ''
}) => {
  // Find closest index for slider positioning
  const currentIndex = options.reduce((prev, curr, idx) => 
    Math.abs(curr - value) < Math.abs(options[prev] - value) ? idx : prev, 0
  );

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
          {unit === 'f/' ? 'ƒ/' : ''}{value}{unit !== 'f/' ? unit : ''}
        </span>
      </div>
      
      <input
        type="range"
        min="0"
        max={options.length - 1}
        step="1"
        value={currentIndex}
        onChange={(e) => onChange(options[parseInt(e.target.value)])}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all duration-200"
      />
      
      <div className="flex justify-between text-[10px] text-stone-400 dark:text-stone-600 font-mono px-1 transition-colors duration-300">
        <span>{options[0]}</span>
        <span>{options[Math.floor(options.length / 2)]}</span>
        <span>{options[options.length - 1]}</span>
      </div>
    </div>
  );
};