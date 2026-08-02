# 前端求职主页

一个使用 HTML、CSS 和 JavaScript 制作的个人前端求职主页，用于展示学习状态、前端技能、项目经历和联系方式，并通过原生 JavaScript 实现基础交互功能。

- 在线预览：https://xixiayu45-sys.github.io/portfolio-project/
- 代码仓库：https://github.com/xixiayu45-sys/portfolio-project

## 项目简介

这是一个面向前端求职展示的静态网页项目。页面使用语义化 HTML 组织内容，使用 CSS 完成响应式布局和视觉样式，使用原生 JavaScript 实现技能管理、项目管理、技术栈筛选、留言反馈和本地数据保存。

项目目前已通过 GitHub Pages 部署，可以直接通过线上地址访问页面效果。

## 简历项目描述

**个人前端求职主页 | HTML / CSS / JavaScript**

- 项目地址：https://xixiayu45-sys.github.io/portfolio-project/
- 代码仓库：https://github.com/xixiayu45-sys/portfolio-project
- 技术栈：HTML、CSS、JavaScript、DOM、localStorage、Flex、Grid

项目描述：

这是一个面向前端求职展示的个人主页项目，包含个人介绍、技能展示、项目经历、技术栈筛选和留言反馈等模块。项目使用原生 HTML/CSS/JavaScript 独立完成，重点展示基础页面结构、响应式布局、DOM 操作、表单校验和本地数据管理能力。

主要工作：

- 使用语义化 HTML 搭建页面结构，划分作品说明、关于我、技能、项目经历和联系方式等内容模块。
- 使用 CSS Flex/Grid、卡片样式和响应式布局优化页面排版，使页面在桌面端和移动端都具备较好的可读性。
- 使用原生 JavaScript 实现技能新增、删除、重置，以及项目新增、编辑、删除和按技术栈筛选。
- 使用 localStorage 保存技能和项目数据，使用户刷新页面后仍能保留本地修改。
- 使用 GitHub 管理项目代码，并通过 GitHub Pages 部署线上预览地址，完成从本地项目到公开作品的交付流程。

## 主要功能

- 展示个人学习状态、求职方向和前端技能
- 支持技能新增、删除和恢复默认技能
- 支持项目新增、编辑和删除
- 支持按技术栈筛选项目列表
- 支持留言表单校验和提交反馈
- 支持重点模式切换
- 使用 localStorage 保存本地技能和项目数据

## 使用技术

- HTML：负责页面结构和内容组织
- CSS：负责页面样式、卡片布局、响应式适配和交互状态
- JavaScript：负责页面交互、表单处理、数据渲染和状态更新
- DOM：负责获取页面元素、创建元素并更新页面内容
- localStorage：负责在浏览器本地保存技能和项目数据
- Flex / Grid：负责导航、技能列表和项目卡片区域布局

## 项目亮点

- 使用原生 JavaScript 完成项目数据的增删改查和筛选流程
- 将技能数据和项目数据集中管理，再通过渲染函数统一更新页面
- 使用 localStorage 实现本地持久化，提升静态页面的交互完整度
- 使用表单校验、反馈文案和删除确认，完善基础用户体验
- 使用 GitHub Pages 完成静态项目部署，具备可访问的线上预览地址

## 文件结构

```txt
portfolio-project
├─ README.md
├─ index.html
├─ style.css
└─ script.js
```

- `index.html`：页面结构和内容
- `style.css`：页面样式和响应式布局
- `script.js`：页面交互逻辑和数据处理
- `README.md`：项目说明文档

## 运行方式

方式一：打开线上预览地址：

```txt
https://xixiayu45-sys.github.io/portfolio-project/
```

方式二：在本地直接用浏览器打开 `index.html`。

本项目是原生静态网页，不需要安装依赖，也不需要运行构建命令。

## 部署说明

项目已部署到 GitHub Pages。

- 发布来源：`main` 分支
- 发布目录：仓库根目录 `/root`
- 首页入口：`index.html`
- 构建步骤：无

## 面试讲解稿

这个项目是一个原生 HTML/CSS/JavaScript 实现的前端求职主页，用来展示个人信息、技能和项目经历。

页面结构使用语义化 HTML，样式部分使用 Flex/Grid 和响应式布局适配不同屏幕。交互部分使用原生 JavaScript 实现技能管理、项目新增、编辑、删除、筛选和 localStorage 本地保存。

开发过程中，我把项目数据集中放在数组中管理，并通过渲染函数统一更新页面，减少重复 DOM 操作。这个项目可以展示我对 HTML 页面结构、CSS 布局、JavaScript DOM 操作、表单校验和本地存储的基础掌握。

## 当前状态

- 已完成原生 HTML/CSS/JavaScript 版本
- 已整理公开 GitHub 仓库
- 已完成 GitHub Pages 线上部署
- 待补充：真实项目截图

## 后续优化

- 优化页面配色、间距和移动端细节
- 补充项目截图，展示首页、项目列表、筛选和表单交互效果
- 基于当前原生版本继续使用 Vue 3 + Vite 进行重构
- 后续增加 Node.js / Express 后端接口，将本地保存升级为前后端交互版本
