module.exports = {
    semi: false,
    singleQuote: true,
    arrowParens: 'avoid',
    trailingComma: 'none',
    endOfLine: 'auto',

    printWidth: 80,
    tabWidth: 4,
    //trailingComma: 'all',
    singleQuote: true,
    //jsxBracketSameLine: true,
    //semi: true,
    importOrder: [
        '^react(.*)$',
        '^next(.*)$',
        '^node(.*)$',
        '^react-icons(.*)$',
        '^leaflet(.*)$',
        '^@hookform(.*)$',
        '^@chakra(.*)$',
        '^yup(.*)$',
        '^[../utils(.*)$]',
        '^[../../_services(.*)$]',
        '^[../../@model(.*)$]',
        '^[../../components(.*)$]',
        '^[../(.*)$]',
        '^[./(.*)$]'
    ],
    importOrderSeparation: true,
    experimentalBabelParserPluginsList: ['jsx', 'typescript']
}
