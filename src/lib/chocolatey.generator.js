process.argv[2] = 'Chocolatey';
const { generateTemplateFilesCommandLine } = require('generate-template-files');
const path = require('path');

const templatesDir = path.join(__dirname, '../templates/chocolatey');
const publicDir = path.join(__dirname, '../../public');

const generateScript = async (options) => {
  await generateTemplateFilesCommandLine([
    {
      option: 'Chocolatey',
      defaultCase: '(noCase)',
      entry: {
        folderPath: templatesDir,
      },
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
        path: path.join(publicDir, options.dirName),
        pathAndFileNameDefaultCase: '(noCase)',
        overwrite: true,
      },
    },
  ]);
  return path.join(options.dirName, `${options.fileName}.ps1`);
};

module.exports = { generateScript };
