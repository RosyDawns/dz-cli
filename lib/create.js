/*
 * @Author: crazycattle
 * @Date: 2021-12-20 11:57:22
 * @Description: 脚手架创建程序
 */

const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");

const Generator = require("./Generator");

module.exports = async (name, options) => {
  console.log("create.js", name, options);

  const cwd = process.cwd();
  const targetDir = path.join(cwd, name);

  if (options.force) {
    await fs.remove(targetDir);
  } else {
    let { action } = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "target directory already exists pick an action:",
        choices: [
          {
            name: "overwrite",
            value: true,
          },
          {
            name: "cancel",
            value: false,
          },
        ],
      },
    ]);

    if (!action) {
      return;
    } else {
      await fs.remove(targetDir);
    }
  }

  const generator = new Generator(name, targetDir);
  generator.create();
};
