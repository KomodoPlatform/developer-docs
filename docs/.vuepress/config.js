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
    logo: "/komodo-logo-icon-black.png",
    nav: navbarImport,
    sidebar: sidebarImport
  }
};