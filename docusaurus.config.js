const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const CURRENT_STABLE_VERSION = "v2.1.5-beta";

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
          href: "https://github.com/federico-terzi/espanso",
          label: "GitHub",
          position: "left",
        },
        {
          href: "/donate",
          label: "Donate ❤",
          position: "right",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownItemsAfter: [{ to: "/versions", label: "All versions" }],
          dropdownActiveClassDisabled: true,
        },
      ],
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
          lastVersion: "current",
          versions: {
            current: {
              label: CURRENT_STABLE_VERSION,
            },
            "0.7.3": {
              label: "v0.7.3 (Legacy)",
              path: "legacy",
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
    CURRENT_STABLE_VERSION,
    LINUX_X11_APP_IMAGE_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/download/{{{VERSION}}}/Espanso-X11.AppImage",
    LINUX_X11_DEB_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/download/{{{VERSION}}}/espanso-debian-x11-amd64.deb",
    LINUX_WAYLAND_DEB_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/download/{{{VERSION}}}/espanso-debian-wayland-amd64.deb",
    MAC_INTEL_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/download/{{{VERSION}}}/Espanso-Mac-Intel.zip",
    MAC_M1_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/download/{{{VERSION}}}/Espanso-Mac-M1.zip",
    WIN_INSTALLER_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/download/{{{VERSION}}}/Espanso-Win-Installer-x86_64.exe",
    WIN_PORTABLE_DOWNLOAD_URL:
      "https://github.com/federico-terzi/espanso/releases/download/{{{VERSION}}}/Espanso-Win-Portable-x86_64.zip",
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
