import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";

const shell = require("shelljs");

function shellExec(template) {
  shell.exec(
    `git clone https://github.com/Pirateoncrew/react-plate.git ${template} `
  );
  shell.cd(path + "/" + template);
  shell.exec("npm i");
  shell.exec("rm -rf .git*");
  //   console.log("%s ", chalk.green.bold(`git initiating`));
  //   shell.exec("git init");
}

export async function createProject(options) {
  const path = options.targetDirectory || process.cwd();
  shellExec(options.template);

  console.log("%s", chalk.green.bold(`cd ${options.template}`));

  console.log("%s for development", chalk.green.bold(`npm run start`));

  console.log("%s for production build", chalk.green.bold(`npm run build`));

  console.log("%s Project ready", chalk.green.bold("DONE"));
  return true;
}
