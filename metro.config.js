const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Extend the list of supported extensions
defaultConfig.resolver.sourceExts.push("cjs", "ts", "tsx");

// Disable experimental package export feature
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
