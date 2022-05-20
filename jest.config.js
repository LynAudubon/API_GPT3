export default {
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ['**/utils/__tests__/index.test.js?(x)']
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: [
        '**/utils/__tests__/api.test.node.js?(x)',
      ]
    },
  ],
};