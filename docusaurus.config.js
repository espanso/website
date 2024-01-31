// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const CURRENT_STABLE_VERSION = "v2.2.1";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Espanso',
  tagline: "A Privacy-first, Cross-platform Text Expander",
  // Set the production url of your site here
  url: "https://espanso.org",
  favicon: 'img/favicon.ico',

  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
      title: "Espanso",
      logo: {
        alt: "Espanso Logo",
        src: "img/logo.png",
      },
      items: [
        {
          href: "/",
          label: "Home",
          position: "left",
        },
        {
          href: "/install",
          label: "Installation",
          position: "left",
        },
        {
          type: "doc",
          docId: "get-started",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://hub.espanso.org",
          label: "Packages",
          position: "left",
        },
        {
          href: "https://www.reddit.com/r/espanso/",
          label: "Community",
          position: "left",
        },
        {
          href: "https://github.com/espanso/espanso",
          label: "GitHub",
          position: "left",
        },
        {
          href: "/donate",
          label: "Donate ❤",
          position: "right",
        },
      ],
    },
    prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: "51GAZM4GBC",

      // Public API key: it is safe to commit it
      apiKey: "dc17ed7f938bd80016738928e74844c6",

      indexName: "espanso",
      disableUserPersonalization: true,
    },
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: "https://github.com/espanso/website/edit/main/",
          lastVersion: "current",
          versions: {
            current: {
              label: CURRENT_STABLE_VERSION,
            },
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  customFields: {
    LINUX_X11_APP_IMAGE_DOWNLOAD_URL:
      "https://github.com/espanso/espanso/releases/download/{{{VERSION}}}/Espanso-X11.AppImage",
    LINUX_X11_DEB_DOWNLOAD_URL:
      "https://github.com/espanso/espanso/releases/download/{{{VERSION}}}/espanso-debian-x11-amd64.deb",
    LINUX_WAYLAND_DEB_DOWNLOAD_URL:
      "https://github.com/espanso/espanso/releases/download/{{{VERSION}}}/espanso-debian-wayland-amd64.deb",
    MAC_INTEL_DOWNLOAD_URL:
      "https://github.com/espanso/espanso/releases/download/{{{VERSION}}}/Espanso-Mac-Intel.zip",
    MAC_M1_DOWNLOAD_URL:
      "https://github.com/espanso/espanso/releases/download/{{{VERSION}}}/Espanso-Mac-M1.zip",
    WIN_INSTALLER_DOWNLOAD_URL:
      "https://github.com/espanso/espanso/releases/download/{{{VERSION}}}/Espanso-Win-Installer-x86_64.exe",
    WIN_PORTABLE_DOWNLOAD_URL:
      "https://github.com/espanso/espanso/releases/download/{{{VERSION}}}/Espanso-Win-Portable-x86_64.zip",
  },
  plugins: [
    function pluginGoogleAnalytics(context) {
      return {
        name: "cloudflare-analytics",

        injectHtmlTags() {
          return {
            postBodyTags: [
              {
                tagName: "div",
                innerHTML:
                  "<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{\"token\": \"4103df9978fb402f87bbdeaf2e0529e6\"}'></script><!-- End Cloudflare Web Analytics -->",
              },
            ],
          };
        },
      };
    },
  ],
};

export default config;
