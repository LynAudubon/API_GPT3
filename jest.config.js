export default {
  projects: [
    {
      displayName: 'node',
      testEnvironment: 'node',
      rootDir: './',
      testMatch: [
        '**/utils/__tests__/api.test.js?(x)',
      ]
    },
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      rootDir: './',
      testMatch: ['**/utils/__tests__/index.test.js?(x)']
    },
  ],
};