import { DefaultTheme, defineConfig } from 'vitepress';
import docs from '../docs/docs.json';

const convertDocsToZhHK = (docs: Record<string, any>[]) => {};

/**
 * Convert feishu-pages's docs.json into VitePress's sidebar config
 * @param docs from `docs.json`
 * @param rootSlug if provided, will find and use this node as the root.
 * @returns
 */
const convertDocsToSidebars = (
  docs: Record<string, any>[],
  rootSlug?: string
) => {
  const sidebars: DefaultTheme.SidebarItem[] = [];

  // Go to root slug
  docs = docs.find((doc) => doc.slug === rootSlug)?.children || docs;

  for (const doc of docs) {
    let sidebar: DefaultTheme.SidebarItem = {
      text: doc.title,
      link: '/' + doc.slug,
    };
    if (doc.children.length > 0) {
      sidebar.items = convertDocsToSidebars(doc.children);
    }
    sidebars.push(sidebar);
  }

  return sidebars;
};

const docsSidebarEN = convertDocsToSidebars(docs, 'en');
const docsSidebarZHCN = convertDocsToSidebars(docs, 'zh-CN');
const docsSidebarZHHK = convertDocsToSidebars(docs, 'zh-HK');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Longbridge Whale Docs',
  base: '/whale-docs/',
  ignoreDeadLinks: true,
  locales: {
    en: {
      label: 'English',
      lang: 'en',
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
    },
    'zh-HK': {
      label: '繁体中文',
      lang: 'zh-HK',
    },
  },
  cleanUrls: true,
  srcExclude: ['SUMMARY.md'],
  srcDir: 'docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Whale Home', link: 'https://longbridgewhale.com' },
      { text: 'Docs', link: '/en' },
    ],

    sidebar: {
      en: docsSidebarEN,
      'zh-CN': docsSidebarZHCN,
      'zh-HK': docsSidebarZHHK,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/longbridgeapp/whale-docs' },
    ],
  },
});
