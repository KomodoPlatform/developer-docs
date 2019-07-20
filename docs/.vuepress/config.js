var redirectAliases = require("./public/_redirects.js");
var sidebarImport = require("./sidebar.js");
var navbarImport = require("./navbar.js");

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
        href: "komodo-logo-icon-black.png"
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
        content: "https://cdn.discordapp.com/attachments/585490205751115777/600473915722301501/composer_twitter.png"
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
    logo: "/site-name-logo.png",
    nav: navbarImport,
    sidebar: sidebarImport
  }
};