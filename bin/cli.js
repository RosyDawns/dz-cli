#! /usr/bin/env node

// #! 用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

console.log("my dz-cli entry js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

const figlet = require("figlet");
const chalk = require("chalk");
// const ora = require('ora')
// const spinner = ora('loading').start()

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "input your name",
      default: "dz-cli",
    },
  ])
  .then((anwsers) => {
    console.log(anwsers);
    const url = path.join(__dirname, "templates");
    const cwdUrl = process.cwd();

    fs.readdir(url, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        ejs.renderFile(path.join(url, file), anwsers).then((data) => {
          fs.writeFileSync(path.join(cwdUrl, file), data);
        });
      });
      

      figlet("Everthing Is Ok", (err, data) => {
        if (err) {
          console.dir(errr);
          return;
        }
        console.log(chalk.green(data));
      });
    });
  });
