import siteConfig from "/docusaurus.config.js";

export const getStableVersion = () => {
  return siteConfig.customFields.CURRENT_STABLE_VERSION;
};

export const getStableDownloadLink = (name) => {
  return siteConfig.customFields[name].replaceAll(
    "{{{VERSION}}}",
    getStableVersion()
  );
};
