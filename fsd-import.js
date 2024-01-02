module.exports = {
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'react{,/*}',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'next{,/*}',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'effector{,-*,-*/*}',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '**/?(*)app{,/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '**/?(*)processes{,/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '**/?(*)pages{,/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '**/?(*)widgets{,/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '**/?(*)features{,/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '**/?(*)entities{,/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '**/?(*)shared{,/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '**/*.{scss,css,sass}',
            group: 'index',
            position: 'after',
          },
          {
            pattern: './*.{scss,css,sass}',
            group: 'index',
            position: 'after',
          },
          {
            pattern: '../*.{scss,css,sass}',
            group: 'index',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
  },
};
