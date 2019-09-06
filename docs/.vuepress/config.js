require('dotenv').config()
var redirectAliases = require("./public/_redirects.js");
var sidebarImport = require("./sidebar.js");
var navbarImport = require("./navbar.js");
var algoliaSecret = require("./algolia-secret.js")
module.exports = {
  plugins: {
    redirect: {
      alias: redirectAliases
    }
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "KMD_Mark_Black.png"
      }
    ],
    [
      "meta",
      {
        name: "twitter:card",
        content: "summary_large_image"
      }
    ],
    [
      "meta",
      {
        name: "twitter:site",
        content: "@komodoplatform"
      }
    ],
    [
      "meta",
      {
        name: "twitter:title",
        content: "Komodo Documentation"
      }
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content: "Documentation for developers building on the Komodo Platform"
      }
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://docs.komodoplatform.com/Dev_Docs_Introduction_small.png"
      }
    ]
  ],
  title: "Komodo Documentation",
  base: "/",
  description: "Documentation for developers building on Komodo",
  themeConfig: {
    repo: "komodoplatform/Documentation",
    repoLabel: "Github",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Suggest an improvement for this page",
    lastUpdated: "Last Updated",
    logo: "/KMD_Horiz_White.svg",
    algolia: {
      apiKey: algoliaSecret.key,
      indexName: 'komodoplatform_doc'
    },
    logo: "/KMD_Mark_White.png",
    nav: navbarImport,
    sidebar: sidebarImport
  }
};