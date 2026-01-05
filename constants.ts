// Standard full-stop and third-stop ISO values
export const ISO_VALUES = [
  50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600
];

// Standard Aperture (f-stop) scale
export const APERTURE_VALUES = [
  1.0, 1.2, 1.4, 1.8, 2.0, 2.8, 4.0, 5.6, 8.0, 11, 16, 22, 32
];

// 这些标签现在通过 i18n 系统处理，保留此文件仅用于向后兼容
// 实际使用时应通过 useLanguage hook 获取翻译
export const TARGET_LABELS: Record<string, string> = {
  'Aperture': 'Aperture',
  'Distance': 'Distance',
  'ISO': 'ISO',
  'Guide Number': 'Guide Number'
};

export const TARGET_DESCRIPTIONS: Record<string, string> = {
  'Aperture': 'Aperture Description',
  'Distance': 'Distance Description',
  'ISO': 'ISO Description',
  'Guide Number': 'Guide Number Description'
};