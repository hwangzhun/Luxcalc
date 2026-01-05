import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'zh' | 'en';

// 检测浏览器语言
export const detectLanguage = (): Language => {
  if (typeof navigator === 'undefined') return 'en';
  
  const lang = navigator.language || navigator.languages?.[0] || 'en';
  return lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
};

// 翻译对象
export const translations = {
  zh: {
    // 目标标签
    'Aperture': '光圈',
    'Distance': '距离',
    'ISO': 'ISO',
    'Guide Number': '闪光指数 (GN)',
    
    // 目标描述
    'Aperture Description': '计算正确曝光所需的光圈值。',
    'Distance Description': '计算闪光灯的有效覆盖距离。',
    'ISO Description': '计算所需的感光度设置。',
    'Guide Number Description': '计算所需的闪光灯输出功率 (GN)。',
    
    // 单位设置
    'Unit System': '单位制',
    'Metric': '公制 (m)',
    'Imperial': '英制 (ft)',
    'Unit Warning': '*请确保闪光指数与所选单位制(米/英尺)一致。',
    
    // 控制标签
    'Guide Number Label': '闪光指数 (GN)',
    'ISO Label': '感光度 ISO',
    'Aperture Label': '光圈',
    'Distance Label': '主体距离',
    
    // 结果显示
    'Result Label': '计算结果: ',
    
    // Footer
    'Copyright': 'Copyright ©',
    
    // Language toggle
    'Switch Language': '切换到英文',
  },
  en: {
    // Target labels
    'Aperture': 'Aperture',
    'Distance': 'Distance',
    'ISO': 'ISO',
    'Guide Number': 'Guide Number (GN)',
    
    // Target descriptions
    'Aperture Description': 'Calculate the required aperture for correct exposure.',
    'Distance Description': 'Calculate the effective coverage distance of the flash.',
    'ISO Description': 'Calculate the required ISO sensitivity setting.',
    'Guide Number Description': 'Calculate the required flash output power (GN).',
    
    // Unit settings
    'Unit System': 'Unit System',
    'Metric': 'Metric (m)',
    'Imperial': 'Imperial (ft)',
    'Unit Warning': '*Please ensure the guide number matches the selected unit system (meters/feet).',
    
    // Control labels
    'Guide Number Label': 'Guide Number (GN)',
    'ISO Label': 'ISO Sensitivity',
    'Aperture Label': 'Aperture',
    'Distance Label': 'Subject Distance',
    
    // Result display
    'Result Label': 'Result: ',
    
    // Footer
    'Copyright': 'Copyright ©',
    
    // Language toggle
    'Switch Language': 'Switch to Chinese',
  },
};

// 语言上下文类型
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言提供者组件
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(detectLanguage);

  // 翻译函数
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.zh] || key;
  };

  // 更新 HTML lang 属性
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 使用语言的 Hook
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

