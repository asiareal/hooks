import { defineConfig } from '@ice/pkg';

export default defineConfig({
  plugins: [
    [
      '@ice/pkg-plugin-docusaurus',
      {
        title: '@asiareal/hooks - 好用的 hooks 库',
        navBarTitle: '@asiareal/hooks - 好用的 hooks 库',
        path: 'packages',
        exclude: ['**/node_modules/**'],
        onBrokenLinks: 'warn',
        sidebarItemsGenerator: async () => {
          return [
            {
              type: 'category',
              label: '基础 hooks',
              items: [{ type: 'doc', id: 'base/docs/useEventListener', label: 'useEventListener' }],
            },
            { type: 'doc', id: 'useIframe/docs/index', label: 'useIframe' },
          ];
        },
        pageRouteBasePath: '/',
        url: 'https://asiareal.github.io',
        baseUrl: '/hooks',
        navBarLogo: '/hooks/img/logo.png',
        favicon: '/hooks/favicon.ico',
      },
    ],
  ],
});
