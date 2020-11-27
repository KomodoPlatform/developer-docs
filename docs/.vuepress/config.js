require("dotenv").config();
var redirectAliases = require("./public/_redirects.js");
var sidebarImport = require("./sidebar.js");
var algoliaSecret = require("./algolia-secret.js");

const autometa_options = {
  schema: true,
  site: {
    name: "Komodo Documentation",
    twitter: "komodoplatform",
  },
  canonical_base: "https://developers.komodoplatform.com",
};

module.exports = {
  plugins: {
    redirect: {
      alias: redirectAliases,
    },
    autometa: autometa_options,
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
    "vuepress-plugin-google-tag-manager": {
      gtm: "GTM-PC28587",
    },
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/KMD_Mark_Black.png",
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
    /* [
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
   */
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
    //lastUpdated: "Last Updated",
    // sidebarDepth: 3,
    logo: "/KMD_Horiz_White.svg",
    algolia: {
      apiKey: algoliaSecret.key,
      indexName: "komodoplatform",
    },
    nav: [
      {
        text: "Start Here",
        link:
          "/basic-docs/start-here/about-komodo-platform/about-komodo-platform.md",
      },
      {
        text: "KomodoPlatform.com",
        link: "https://komodoplatform.com",
      },
    ],
    sidebar: {
      "/basic-docs/": sidebarImport,

      // Repeat everything from above
      "/": sidebarImport,
    },
  },
};
