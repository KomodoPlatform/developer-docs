require("dotenv").config();
var redirectAliases = require("./public/_redirects.js");
var sidebarImport = require("./sidebar.js");
var navbarImport = require("./navbar.js");

// var algoliaSecret = require("./algolia-secret.js")
module.exports = {
  plugins: {
    redirect: {
      alias: redirectAliases,
    },
    "@vuepress/last-updated": {
      transformer: (timestamp) => {
        // Don't forget to install moment yourself
        const moment = require("moment");
        return moment(timestamp).fromNow();
      },
    },
    "vuepress-plugin-medium-zoom": {
      //selector: ".my-wrapper .my-img",
      delay: 1000,
      options: {
        margin: 24,
        background: "#026782",
        scrollOffset: 0,
      },
    },
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "mark_only.svg",
      },
    ],
    [
      "meta",
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    [
      "meta",
      {
        name: "twitter:site",
        content: "@komodoplatform",
      },
    ],
    [
      "meta",
      {
        name: "twitter:title",
        content: "Komodo Developer Documentation",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content: "Documentation for developers building on the Komodo Platform",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content:
          "https://developers.komodoplatform.com/start-here-pics/Dev_Docs_Introduction_small.png",
      },
    ],
  ],
  title: "AtomicDEX Documentation",
  base: "/",
  description: "Documentation for developers building on AtomicDEX",
  themeConfig: {
    repo: "KomodoPlatform/AtomicDEX-docs",
    repoLabel: "Github",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Suggest an improvement for this page",
    //lastUpdated: "Last Updated",
    // sidebarDepth: 3,
    logo: "/logo_light.svg",
    // algolia: {
    // apiKey: algoliaSecret.key,
    // indexName: 'komodoplatform'
    // },
    nav: navbarImport,
    sidebar: sidebarImport,
  },
};
