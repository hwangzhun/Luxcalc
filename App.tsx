import React, { useState, useEffect } from 'react';
import { CalculationTarget, UnitSystem, CalculatorState } from './types';
import { calculateFlashParameter } from './utils/calculator';
import { ISO_VALUES, APERTURE_VALUES } from './constants';
import { NumberControl } from './components/NumberControl';
import { ContinuousControl } from './components/ContinuousControl';
import { ResultDisplay } from './components/ResultDisplay';
import { useLanguage } from './utils/i18n';

// Icons
const ApertureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m14.31 8 5.74 9.94"/><path d="M9.69 8h11.48"/><path d="m7.38 12 5.74-9.94"/><path d="M9.69 16 3.95 6.06"/><path d="M14.31 16H2.83"/><path d="m16.62 12-5.74 9.94"/></svg>
);
const RulerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M2 8v4"/><path d="M6 9v3"/><path d="M10 8v4"/><path d="M14 9v3"/><path d="M18 8v4"/><path d="M22 9v3"/></svg>
);
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const IsoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M16 11.5V16"/><path d="M13 13h-2"/><path d="M8 9v7"/></svg>
);
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

const Logo = ({ isDark }: { isDark: boolean }) => (
  <div className="flex items-center gap-3 select-none">
    <div className="relative w-10 h-10 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-center overflow-hidden shadow-lg dark:shadow-2xl group transition-all duration-300">
      <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors"></div>
      <img 
        src={isDark ? '/favicon_dark.svg' : '/favicon_light.svg'}
        alt="LuxCalc Logo"
        width="32"
        height="32"
        className="relative z-10 transform group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div className="flex flex-col">
      <h1 className="text-lg font-bold tracking-[0.2em] text-stone-900 dark:text-stone-100 leading-none transition-colors duration-300">LUXCALC</h1>
      <span 
        lang="en" 
        className="text-[10px] text-stone-500 font-mono tracking-widest uppercase mt-0.5"
        style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}
      >
        Flash Tool
      </span>
    </div>
  </div>
);

const LanguageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

const App: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [state, setState] = useState<CalculatorState>({
    target: CalculationTarget.APERTURE,
    iso: 100,
    aperture: 5.6,
    distance: 3, // Default 3 meters/10ft
    guideNumber: 60, // Standard high power flash
    unit: UnitSystem.METRIC,
  });

  const [result, setResult] = useState<string>("0");
  const [showUnitSettings, setShowUnitSettings] = useState(false);
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  
  // 根据访问时间自动判断暗黑模式：18:00-6:00 为暗黑模式
  const getInitialTheme = (): boolean => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  };
  
  const [isDark, setIsDark] = useState(getInitialTheme);
  
  // 切换语言
  const toggleLanguage = () => {
    setIsLanguageChanging(true);
    setTimeout(() => {
      setLanguage(language === 'zh' ? 'en' : 'zh');
      setTimeout(() => {
        setIsLanguageChanging(false);
      }, 150);
    }, 150);
  };

  // Theme effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const res = calculateFlashParameter(
      state.target,
      state.guideNumber,
      state.iso,
      state.aperture,
      state.distance
    );
    setResult(res);
  }, [state]);

  const updateState = (key: keyof CalculatorState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const getUnitLabel = () => state.unit === UnitSystem.METRIC ? 'm' : 'ft';

  // Navigation Logic
  const tabs = [
    { id: CalculationTarget.APERTURE, icon: ApertureIcon },
    { id: CalculationTarget.DISTANCE, icon: RulerIcon },
    { id: CalculationTarget.ISO, icon: IsoIcon },
    { id: CalculationTarget.GN, icon: ZapIcon },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-200 flex flex-col items-center transition-colors duration-300">
      
      {/* Header */}
      <header className="w-full max-w-md p-6 flex justify-between items-center z-10">
        <Logo isDark={isDark} />
        <div className="flex gap-2">
          <button 
            onClick={toggleLanguage}
            className={`p-2 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-all duration-300 ease-out transform active:scale-95 ${
              isLanguageChanging ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
            }`}
            title={t('Switch Language')}
            style={{
              transform: isLanguageChanging 
                ? 'translate3d(0, 0, 0) rotate(180deg) scale(1.1)' 
                : 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
              WebkitTransform: isLanguageChanging 
                ? 'translate3d(0, 0, 0) rotate(180deg) scale(1.1)' 
                : 'translate3d(0, 0, 0) rotate(0deg) scale(1)'
            }}
          >
            <LanguageIcon />
          </button>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-all duration-300 ease-out transform active:scale-95"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button 
            onClick={() => setShowUnitSettings(!showUnitSettings)}
            className={`p-2 rounded-full transition-all duration-300 ease-out transform active:scale-95 ${showUnitSettings ? 'bg-stone-200 dark:bg-stone-800 text-amber-500 rotate-90' : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 rotate-0'}`}
          >
            <SettingsIcon />
          </button>
        </div>
      </header>

      {/* Unit Settings Modal (Inline) */}
      <div 
        className={`w-full max-w-md px-6 mb-6 transition-all duration-300 ease-out overflow-hidden ${
          showUnitSettings 
            ? 'opacity-100 max-h-96 transform translate-y-0' 
            : 'opacity-0 max-h-0 transform -translate-y-4'
        }`}
        style={{
          transform: showUnitSettings ? 'translate3d(0, 0, 0)' : 'translate3d(0, -16px, 0)',
          WebkitTransform: showUnitSettings ? 'translate3d(0, 0, 0)' : 'translate3d(0, -16px, 0)'
        }}
      >
        <div className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-200 dark:border-stone-800 flex justify-between items-center shadow-lg dark:shadow-none transition-colors duration-300">
          <span 
            key={`unit-system-${language}`}
            className={`text-sm font-medium text-stone-500 dark:text-stone-400 transition-all duration-300 ${
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
            {t('Unit System')}
          </span>
          <div className="flex bg-stone-100 dark:bg-stone-950 rounded-lg p-1 transition-colors duration-300 relative">
            <div 
              className={`absolute top-1 bottom-1 rounded-md bg-white dark:bg-stone-800 shadow-sm transition-all duration-300 ease-out ${
                state.unit === UnitSystem.METRIC 
                  ? 'left-1 right-1/2' 
                  : 'left-1/2 right-1'
              }`}
            />
            <button 
              onClick={() => updateState('unit', UnitSystem.METRIC)}
              className={`relative z-10 px-4 py-1 rounded-md text-xs font-bold transition-colors duration-300 ${
                state.unit === UnitSystem.METRIC 
                  ? 'text-stone-900 dark:text-white' 
                  : 'text-stone-500 dark:text-stone-600'
              }`}
            >
              <span 
                key={`metric-${language}`}
                className={`inline-block transition-all duration-300 ${
                  isLanguageChanging ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                }`}
                style={{
                  transform: isLanguageChanging 
                    ? 'translate3d(0, 0, 0) scale(0.95)' 
                    : 'translate3d(0, 0, 0) scale(1)',
                  WebkitTransform: isLanguageChanging 
                    ? 'translate3d(0, 0, 0) scale(0.95)' 
                    : 'translate3d(0, 0, 0) scale(1)'
                }}
              >
                {t('Metric')}
              </span>
            </button>
            <button 
              onClick={() => updateState('unit', UnitSystem.IMPERIAL)}
              className={`relative z-10 px-4 py-1 rounded-md text-xs font-bold transition-colors duration-300 ${
                state.unit === UnitSystem.IMPERIAL 
                  ? 'text-stone-900 dark:text-white' 
                  : 'text-stone-500 dark:text-stone-600'
              }`}
            >
              <span 
                key={`imperial-${language}`}
                className={`inline-block transition-all duration-300 ${
                  isLanguageChanging ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                }`}
                style={{
                  transform: isLanguageChanging 
                    ? 'translate3d(0, 0, 0) scale(0.95)' 
                    : 'translate3d(0, 0, 0) scale(1)',
                  WebkitTransform: isLanguageChanging 
                    ? 'translate3d(0, 0, 0) scale(0.95)' 
                    : 'translate3d(0, 0, 0) scale(1)'
                }}
              >
                {t('Imperial')}
              </span>
            </button>
          </div>
        </div>
        <div 
          key={`unit-warning-${language}`}
          className={`text-xs text-stone-500 dark:text-stone-600 mt-2 px-1 text-center transition-all duration-300 ${
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
          {t('Unit Warning')}
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-md flex-1 flex flex-col pb-6">
        
        {/* Target Selector Tabs */}
        <div className="px-6 mb-2">
          <div className="grid grid-cols-4 gap-2 p-1 bg-stone-200 dark:bg-stone-900 rounded-2xl transition-colors duration-300 relative">
            {tabs.map((tab) => {
              const isActive = state.target === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => updateState('target', tab.id)}
                  className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 ease-out relative z-10 ${
                    isActive 
                      ? 'bg-white dark:bg-stone-800 text-amber-500 shadow-sm dark:shadow-lg scale-100 ring-1 ring-black/5 dark:ring-stone-700 transform translate-y-0' 
                      : 'text-stone-500 dark:text-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800/50 hover:text-stone-600 dark:hover:text-stone-400 scale-95 transform translate-y-0'
                  }`}
                  style={{
                    transform: isActive 
                      ? 'translate3d(0, 0, 0) scale(1)' 
                      : 'translate3d(0, 0, 0) scale(0.95)',
                    WebkitTransform: isActive 
                      ? 'translate3d(0, 0, 0) scale(1)' 
                      : 'translate3d(0, 0, 0) scale(0.95)'
                  }}
                >
                  <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                    <Icon />
                  </div>
                  <span 
                    key={`tab-${tab.id}-${language}`}
                    className={`text-[10px] font-bold mt-1 uppercase tracking-wider transition-all duration-300 ${
                      isLanguageChanging ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                    }`}
                    style={{
                      transform: isLanguageChanging 
                        ? 'translate3d(0, 0, 0) scale(0.95)' 
                        : 'translate3d(0, 0, 0) scale(1)',
                      WebkitTransform: isLanguageChanging 
                        ? 'translate3d(0, 0, 0) scale(0.95)' 
                        : 'translate3d(0, 0, 0) scale(1)'
                    }}
                  >
                    {t(tab.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Result Area */}
        <div className="flex-grow flex items-center justify-center min-h-[200px] relative">
          <div 
            key={`${state.target}-${language}`}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isLanguageChanging ? 'opacity-0 transform translate-y-4 scale-95' : 'opacity-100 transform translate-y-0 scale-100'
            }`}
            style={{
              transform: isLanguageChanging 
                ? 'translate3d(0, 16px, 0) scale(0.95)' 
                : 'translate3d(0, 0, 0) scale(1)',
              WebkitTransform: isLanguageChanging 
                ? 'translate3d(0, 16px, 0) scale(0.95)' 
                : 'translate3d(0, 0, 0) scale(1)',
              animation: !isLanguageChanging ? 'fadeIn 0.4s ease-out' : 'none'
            }}
          >
            <ResultDisplay 
              value={result} 
              label={`${t('Result Label')}${t(state.target)}`}
              subLabel={t(`${state.target} Description`)}
              unit={state.target === CalculationTarget.DISTANCE ? getUnitLabel() : undefined}
              isLanguageChanging={isLanguageChanging}
              languageKey={`result-${language}`}
            />
          </div>
        </div>

        {/* Dynamic Controls */}
        <div className="px-6 space-y-3 z-10 pb-10">
          
          {/* Guide Number (Always needed unless it's the target) */}
          <div 
            className={`transition-all duration-300 ease-out overflow-hidden ${
              state.target !== CalculationTarget.GN
                ? 'opacity-100 max-h-96 transform translate-y-0'
                : 'opacity-0 max-h-0 transform -translate-y-4 pointer-events-none'
            }`}
            style={{
              transform: state.target !== CalculationTarget.GN 
                ? 'translate3d(0, 0, 0)' 
                : 'translate3d(0, -16px, 0)',
              WebkitTransform: state.target !== CalculationTarget.GN 
                ? 'translate3d(0, 0, 0)' 
                : 'translate3d(0, -16px, 0)'
            }}
          >
            <ContinuousControl
              label={t('Guide Number Label')}
              value={state.guideNumber}
              min={10}
              max={200}
              step={1}
              onChange={(val) => updateState('guideNumber', val)}
              unit=""
              isLanguageChanging={isLanguageChanging}
              languageKey={`gn-${language}`}
            />
          </div>

          {/* ISO (Always needed unless target) */}
          <div 
            className={`transition-all duration-300 ease-out overflow-hidden ${
              state.target !== CalculationTarget.ISO
                ? 'opacity-100 max-h-96 transform translate-y-0'
                : 'opacity-0 max-h-0 transform -translate-y-4 pointer-events-none'
            }`}
            style={{
              transform: state.target !== CalculationTarget.ISO 
                ? 'translate3d(0, 0, 0)' 
                : 'translate3d(0, -16px, 0)',
              WebkitTransform: state.target !== CalculationTarget.ISO 
                ? 'translate3d(0, 0, 0)' 
                : 'translate3d(0, -16px, 0)'
            }}
          >
            <NumberControl
              label={t('ISO Label')}
              value={state.iso}
              options={ISO_VALUES}
              onChange={(val) => updateState('iso', val)}
              isLanguageChanging={isLanguageChanging}
              languageKey={`iso-${language}`}
            />
          </div>

          {/* Aperture (needed if not target) */}
          <div 
            className={`transition-all duration-300 ease-out overflow-hidden ${
              state.target !== CalculationTarget.APERTURE
                ? 'opacity-100 max-h-96 transform translate-y-0'
                : 'opacity-0 max-h-0 transform -translate-y-4 pointer-events-none'
            }`}
            style={{
              transform: state.target !== CalculationTarget.APERTURE 
                ? 'translate3d(0, 0, 0)' 
                : 'translate3d(0, -16px, 0)',
              WebkitTransform: state.target !== CalculationTarget.APERTURE 
                ? 'translate3d(0, 0, 0)' 
                : 'translate3d(0, -16px, 0)'
            }}
          >
            <NumberControl
              label={t('Aperture Label')}
              value={state.aperture}
              options={APERTURE_VALUES}
              onChange={(val) => updateState('aperture', val)}
              unit="f/"
              isLanguageChanging={isLanguageChanging}
              languageKey={`aperture-${language}`}
            />
          </div>

          {/* Distance (needed if not target) */}
          <div 
            className={`transition-all duration-300 ease-out overflow-hidden ${
              state.target !== CalculationTarget.DISTANCE
                ? 'opacity-100 max-h-96 transform translate-y-0'
                : 'opacity-0 max-h-0 transform -translate-y-4 pointer-events-none'
            }`}
            style={{
              transform: state.target !== CalculationTarget.DISTANCE 
                ? 'translate3d(0, 0, 0)' 
                : 'translate3d(0, -16px, 0)',
              WebkitTransform: state.target !== CalculationTarget.DISTANCE 
                ? 'translate3d(0, 0, 0)' 
                : 'translate3d(0, -16px, 0)'
            }}
          >
            <ContinuousControl
              label={t('Distance Label')}
              value={state.distance}
              min={state.unit === UnitSystem.METRIC ? 0.5 : 2}
              max={state.unit === UnitSystem.METRIC ? 50 : 150}
              step={state.unit === UnitSystem.METRIC ? 0.5 : 1}
              onChange={(val) => updateState('distance', val)}
              unit={getUnitLabel()}
              isLanguageChanging={isLanguageChanging}
              languageKey={`distance-${language}`}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md px-6 py-4 text-center">
        <p 
          key={`copyright-${language}`}
          className={`text-xs text-stone-500 dark:text-stone-600 transition-all duration-300 ${
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
          {t('Copyright')}{' '}
          <a 
            href="https://github.com/hwangzhun/Luxcalc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300 underline decoration-stone-400 dark:decoration-stone-600 hover:decoration-amber-500 dark:hover:decoration-amber-400"
          >
            Hwangzhun
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;