module.exports = {
  title: 'Komodo Developer Documentation',
  base: '/komodo-docs-vuepress/',
  description: 'Documentation for developers building on Komodo',
  themeConfig: {
    nav: [
      { text: 'Start Here', link: '/000-start-here/001-introduction.md' },
      { text: 'KomodoPlatform.com', link: 'https://komodoplatform.com' },
    ],
    sidebar: [
      {
        title: 'Start Here',
        collapsable: true,
        children: [
          [ '/000-start-here/001-introduction.md', 'Introduction'],
          [ '/000-start-here/005-outline-for-new-developers.md', 'Outline for New Developers']
        ]
      }
    ]
  }
}
