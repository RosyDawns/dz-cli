#! /usr/bin/env node

const { program } = require("commander");
const spawn = require("cross-spawn");
const chalk = require("chalk");
const ora = require("ora");
const spinner = ora();
spinner.start();
spinner.stop();
program
  .version("0.1.0")
  .command("create <name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    require("../lib/create")(name, options);
    // const dependencies = ['vue', 'vuex', 'vue-router']
    // const child = spawn('npm', ['install', '-D'].concat(dependencies), {
    //   stdio: 'inherit'
    // })
    // child.on('close', code => {
    //   console.log(code)
    //   if (code !== 0) {
    //     spinner.fail(chalk.red(`${name} app Install Failed !`))
    //     process.exit(1)
    //   } else {
    //     spinner.succeed(chalk.green(`${name} app Install Finished !`))
    //   }
    // })
  });

// 配置 config 命令
program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value from option")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option from config")
  .action((value, options) => {
    console.log(value, options);
  });

// 配置 ui 命令
program
  .command("ui")
  .description("start add open dz-cli ui")
  .option("-p, --port <port>", "Port used for the UI Server")
  .action((option) => {
    console.log(option);
  });

// 监听--help执行 说明信息
program.on("--help", () => {
  console.log(
    `\r\nRun ${chalk.cyan(
      `dz <command> --help`
    )} for detailed usage of given command\r\n`
  );
});

program.parse();
