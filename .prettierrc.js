module.exports = {
    'bracketSpacing': true,
    'singleQuote': true,
    'printWidth': 120,
    'quoteProps': 'preserve',
    'tabWidth': 4,
    'endOfLine': require('os').EOL === '\r\n' ? 'crlf' : 'lf',
    'trailingComma': 'all',
    'semi': true,
    'arrowParens': 'avoid',
    'overrides': [
        {
            'files': '*.json',
            'options': {
                'printWidth': 10,
            },
        },
        {
            'files': '.prettierrc',
            'options': {
                'parser': 'json',
            },
        },
        {
            'files': '*.html',
            'options': {
                'parser': 'angular',
                'htmlWhitespaceSensitivity': 'css',
                'jsxBracketSameLine': false,
                'semi': true,
                'trailingComma': 'none',
            },
        },
        {
            'files': '*.yml',
            'options': {
                'tabWidth': 2,
                'singleQuote': false,
            },
        },
    ],
};
