/*
 * @Author: crazycattle
 * @Date: 2021-12-20 16:38:48
 * @Description: 用户选择模版类
 */
const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const inquirer = require("inquirer");
const util = require("util");
const downloadGitRepo = require("download-git-repo");
const { getRepoList, getTagList } = require("./http");

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();
  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail(`${error} : Request failed, refetch...`);
  }
}

class Generator {
  constructor(name, targetDir) {
    this.name = name;
    this.targetDir = targetDir;

    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async download(repo, tag) {
    const requestUrl = `CrazyCattle/${repo}${tag ? "#" + tag : ""}`;
    console.log(requestUrl, "requestUrl");

    await wrapLoading(
      this.downloadGitRepo,
      "waiting download template...",
      requestUrl,
      path.resolve(process.cwd(), this.targetDir)
    );
  }

  async getRepo() {
    const repoList = await wrapLoading(getRepoList, "waiting fetch template...");

    if (!repoList) return;
    const repos = repoList.map((item) => item.name);
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "please choose a template to create project:",
    });
    return repo;
  }

  async getTag(repo) {
    const tags = await wrapLoading(getTagList, "waiting fetch tag", repo);
    if (!tags) return;
    const tagsList = tags.map((item) => item.name);
    const { tag } = await inquirer.prompt({
      name: "tag",
      type: "list",
      choices: tagsList,
      message: "please choose a tag to create project:",
    });

    return tag;
  }

  async create() {
    const repo = await this.getRepo();
    if (repo) {
      const tag = await this.getTag(repo);
      console.log(`用户选择了， repo: ${repo}, tag: ${tag}`);
      await this.download(repo, tag);

      console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
      console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
      console.log("\r\n  npm install");
      console.log("  npm run dev\r\n");
    } else {
      console.log("repeat create");
    }
  }
}

module.exports = Generator;
