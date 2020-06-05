require("dotenv").config();
var redirectAliases = require("./public/_redirects.js");
var sidebarExtraImport = require("./sidebar-extra.js");
var navbarImport = require("./navbar.js");
var algoliaSecret = require("./algolia-secret.js");

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
      "script",
      {},
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PC28587');`,
    ],
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
        name: "twitter:card",
        content: "summary_large_image",
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
        content: "Komodo Documentation",
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
          "https://docs.komodoplatform.com/Dev_Docs_Introduction_small.png",
      },
    ],
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
      indexName: "komodoplatform_doc",
    },
    logo: "/KMD_Mark_White.png",
    nav: navbarImport,
    sidebar: sidebarExtraImport,
  },
};
