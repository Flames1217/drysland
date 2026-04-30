# 🏝️ Drysland

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Three.js](https://img.shields.io/badge/ThreeJs-black?style=for-the-badge&logo=three.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> 🥇 在 [Three.js Journey Challenge 017](https://threejs-journey.com/challenges/017-island) 中获得第一名

> 在线体验 👉 [drysland.dammafra.dev](https://drysland.dammafra.dev)

Drysland 灵感来自经典的“管道连接”玩法。你需要旋转并重连断裂的河道地块，让河流重新贯通，为干涸的岛屿带回水与生机。

每一关都是程序生成的岛屿，难度会随着关卡推进逐步提升。
关卡网络基于简化版 **Growing Tree 算法** 构建，保证“可解且不重复”。

<img src="./static/cover.png" alt="封面"  >

## 技术栈

- [Three.js](https://threejs.org/)（3D 渲染）
- [Tweakpane](https://tweakpane.github.io/docs/)（调试面板）
- [@yomotsu/camera-controls](https://github.com/yomotsu/camera-controls)
- [@pmndrs/pointer-events](https://www.npmjs.com/package/@pmndrs/pointer-events)
- [GSAP](https://gsap.com/)
- [Firebase](https://firebase.google.com/)
- [Tailwind](https://tailwindcss.com/)

## 本地运行

```bash
# 安装依赖（首次执行）
npm install

# 启动本地开发服务（localhost:5173）
npm run dev

# 构建生产版本到 dist/ 目录
npm run build
```

## 功能特性

### 关卡生成

所有关卡都保证可解。核心做法是在固定尺寸的六边形网格中，优先使用深度优先遍历（DFS）生成一条或多条连续路径。

主路径生成后，算法会进行二次遍历，按概率增加额外连接，在不破坏可解性的前提下提升复杂度。

最后再随机旋转所有地块，形成实际可玩的谜题。

当前主要可调参数包括：

- **遍历策略**：路径生成时的节点选择方式（如 DFS、BFS 或混合策略）
- **网格半径**：关卡大小
- **网格覆盖率**：参与主路径生成的格子比例
- **额外连接概率**：二次遍历中新增连接的概率
- **死路保留比例**：保留死路以维持挑战性的比例

### 存档与同步

<img src="./screens/log-in.png" alt="登录"  >
<img src="./screens/state-conflict.png" alt="存档冲突"  >

游戏会自动将进度保存在浏览器本地存储中。
你也可以使用 Google 登录，实现多设备云同步。
当本地与云端进度不一致时，会弹出冲突选择界面让你决定保留哪份存档。

### 画质设置

<img src="./screens/settings.png" alt="设置"  >

支持“高画质 / 高性能”模式切换，用于平衡阴影、水面效果与运行流畅度。你的选择会被自动保存并在下次进入时恢复。

### 移动端适配

Drysland 针对手机和平板做了交互与布局适配，在触摸屏上也能获得流畅体验。

|                                                             |                                                               |                                                            |                                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| <img src="./screens/mobile-1.png" alt="移动端主菜单"  > | <img src="./screens/mobile-2.png" alt="移动端关卡开始"  > | <img src="./screens/mobile-3.png" alt="移动端游戏中"  > | <img src="./screens/mobile-4.png" alt="移动端通关"  > |

## 鸣谢

完整素材来源可在游戏内 Credits 中查看。

<img src="./screens/credits.png" alt="鸣谢"  >

- **Hexagon Kit**： [Kenney.nl](https://kenney.nl/assets/hexagon-kit)
- **Cursor Pack**： [Kenney.nl](https://kenney.nl/assets/cursor-pack)
- **Wind flow implementation**： [@boytchev](https://github.com/boytchev) / [CodePen](https://codepen.io/boytchev/pen/qBLNEVZ)
- **音频素材**：来自 [Pixabay](https://pixabay.com)
- **Skybox**： [Freestylized](https://freestylized.com/skybox/sky_42/)
- **Low-Poly Seagull**： [simonaskLDE](https://skfb.ly/orun9) / [Sketchfab](https://sketchfab.com)
- **Sail Ship**： [Quaternius](https://poly.pizza/m/cIzO4MBPqI) / [Poly Pizza](https://poly.pizza)
- **Sailboat**： [Poly by Google](https://poly.pizza/m/1d76pfN4Dne) / [Poly Pizza](https://poly.pizza)

## 反馈

欢迎提出建议或反馈。

## 许可证

© 2025 Francesco Dammacco  
本项目基于 GNU Affero General Public License v3.0 许可发布。  
详见 [LICENSE](./LICENSE)。
