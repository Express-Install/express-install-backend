process.argv[2] = 'Chocolatey';
process.argv[3] = '__ignore1__=null';
process.argv[4] = '__ignore2__=null';
const { generateTemplateFilesCommandLine } = require('generate-template-files');
const path = require('path');
const { removeDirRecursively } = require('../scheduler/removePackage.schedule');

const templatesDir = path.join(__dirname, '../templates/chocolatey');
const publicDir = path.join(__dirname, '../../public');

const randomUserId = () => {
  // eslint-disable-next-line no-bitwise
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, () => {
        // eslint-disable-next-line no-bitwise
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

const generateScript = async (options) => {
  const dirPath = options.dirName !== '' ? options.dirName : randomUserId();
  await generateTemplateFilesCommandLine([
    {
      option: 'Chocolatey',
      defaultCase: '(noCase)',
      entry: {
        folderPath: templatesDir,
      },
      stringReplacers: ['__ignore1__', '__ignore2__'],
      dynamicReplacers: [
        {
          slot: '__fileName__',
          slotValue: options.fileName,
        },
        {
          slot: '__package__',
          slotValue: options.packages,
        },
      ],
      output: {
        path: path.join(publicDir, dirPath),
        pathAndFileNameDefaultCase: '(noCase)',
        overwrite: true,
      },
      onComplete: async (results) =>
        // eslint-disable-next-line no-return-await
        await removeDirRecursively(results.output.path, dirPath),
    },
  ]);
  return path.join(dirPath, `${options.fileName}.ps1`);
};

module.exports = { generateScript };
