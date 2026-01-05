# LUXCALC - 闪光灯计算器

一个简洁的闪光灯参数计算工具，帮助摄影师快速计算光圈、距离、ISO 和闪光指数。

🌐 [在线体验 Demo](https://luxcalc.hwangzhun.com/)

## 功能特性

- 📸 计算光圈值（Aperture）
- 📏 计算拍摄距离（Distance）
- 🔢 计算感光度（ISO）
- ⚡ 计算闪光指数（Guide Number）
- 🌍 支持公制（米）和英制（英尺）单位
- 🌙 深色/浅色主题切换

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 使用方法

1. 选择要计算的目标参数（光圈/距离/ISO/闪光指数）
2. 输入其他已知参数
3. 查看计算结果

## 计算公式

基于闪光灯曝光公式：
- `GN_effective = Aperture × Distance`
- `GN_effective = GN_base × √(ISO / 100)`

