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
    ]
  ],
  head: [
    ["script", {}, `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PC28587');`],
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
        content: "Komodo Developer Documentation"
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
        content: "https://developers.komodoplatform.com/start-here-pics/Dev_Docs_Introduction_small.png"
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
