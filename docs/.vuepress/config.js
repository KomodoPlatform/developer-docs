require('dotenv').config()
var redirectAliases = require("./public/_redirects.js");
var sidebarImport = require("./sidebar.js");
var algoliaSecret = require("./algolia-secret.js")
module.exports = {
  plugins: [
    [
      "redirect",
      {
        alias: redirectAliases
      }
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-84859153-3"
      }
    ]
  ],
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "KMD_Mark_Black.png"
      }
    ]
  ],
  title: "Komodo Documentation",
  base: "/",
  description: "Documentation for developers building on Komodo",
  themeConfig: {
    repo: "komodoplatform/developer-docs",
    repoLabel: "Github",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Suggest an improvement for this page",
    lastUpdated: "Last Updated",
    // sidebarDepth: 3,
    logo: "/KMD_Horiz_White.svg",
    algolia: {
      apiKey: algoliaSecret.key,
      indexName: 'komodoplatform'
    },
    nav: [{
        text: "Start Here",
        link: "/basic-docs/start-here/about-komodo-platform/about-komodo-platform.md"
      },
      {
        text: "KomodoPlatform.com",
        link: "https://komodoplatform.com"
      }
    ],
    sidebar: {
      "/basic-docs/": sidebarImport,

      // Repeat everything from above
      "/": sidebarImport
    }
  }
};
