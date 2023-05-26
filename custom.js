const fs = require('fs');

const formatCssVariables = (dictionary) => {
  const tokens = dictionary.allTokens;
  const output = tokens.map((token) => {
    const prefix = 'sc';
    const path = token.path.join('-');
    return `--${prefix}-${path}: ${token.value};`;
  });
  return `:root {\n${output.join('\n')}\n}`;
};

const styleDictionary = require('style-dictionary').extend({
  ...JSON.parse(fs.readFileSync('config.json')),
  format: {
    'custom/css-variables': formatCssVariables,
  },
});

styleDictionary.buildAllPlatforms();

module.exports = styleDictionary;
