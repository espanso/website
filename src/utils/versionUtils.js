import siteConfig from "../../docusaurus.config";

export const getStableVersion = () => {
  return siteConfig.customFields.CURRENT_STABLE_VERSION;
};

export const getStableDownloadLink = (name) => {
  return siteConfig.customFields[name].replace(
    "{{{VERSION}}}",
    getStableVersion()
  );
};
