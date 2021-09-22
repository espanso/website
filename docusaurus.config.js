const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Espanso",
  tagline: "A Privacy-first, Cross-platform Text Expander",
  url: "https://espanso.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "federico-terzi", // Usually your GitHub org/user name.
  projectName: "espanso", // Usually your repo name.
  trailingSlash: true,
  themeConfig: {
    navbar: {
      title: "Espanso",
      logo: {
        alt: "Espanso Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "doc",
          docId: "get-started",
          position: "left",
          label: "Documentation",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownItemsAfter: [{ to: "/versions", label: "All versions" }],
          dropdownActiveClassDisabled: true,
        },
        {
          href: "https://github.com/federico-terzi/espanso",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Federico Terzi. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/espanso/website/edit/main/",
          versions: {
            current: {
              label: `2.0.0-alpha 🚧`,
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  customFields: {
    LINUX_X11_APP_IMAGE_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/latest/download/Espanso-X11.AppImage",
    MAC_INTEL_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/latest/download/espanso-mac-intel.zip",
    MAC_M1_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/latest/download/espanso-mac-m1.zip",
    WIN_INSTALLER_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/latest/download/espanso-win-installer-x64.exe",
    WIN_PORTABLE_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/latest/download/espanso-win-portable-x64.exe",
  },
};
