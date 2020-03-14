const fs = require('fs');
const {encode, decode} = require('./src/huffman');

const argv = process.argv.slice(2);

if (!(argv.length === 3 && (argv[0] === '-a' || argv[0] === '-u'))) {
    console.log('Использование');
    console.log('  Сжатие:     node cli -a inFileName outFileName');
    console.log('  Разжатие:   node cli -u inFileName outFileName');

    process.exit(1);
}

const compress = argv[0] === '-a';
const inFileName = argv[1];
const outFileName = argv[2];

const inBuffer = fs.readFileSync(inFileName);
const outBuffer = compress
    ? encode(inBuffer)
    : decode(inBuffer);

fs.writeFileSync(outFileName, outBuffer);
