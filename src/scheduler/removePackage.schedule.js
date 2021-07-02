const fsPromises = require('fs').promises;

const { userService } = require('../services');
const logger = require('../config/logger');

const fileValidDuration = 2 * 60 * 60 * 1000;

const removeDirRecursively = async (path, userId) => {
  const user = await userService.getUserById(userId);
  const isEmailVerified = user !== null ? user.isEmailVerified : null;
  if (isEmailVerified === false || user === null) {
    logger.info(
      `User is not exist nor verify email, folder ${path} will be removed after ${
        fileValidDuration / 60000
      } min`,
    );
    setTimeout(async () => {
      try {
        await fsPromises.rm(path, {
          recursive: true,
        });
        logger.info(`Folder ${path} removed successfully`);
      } catch (e) {
        logger.error(`Unable to remove ${path}!`);
        throw e;
      }
    }, fileValidDuration);
  }
};

module.exports = {
  removeDirRecursively,
};
