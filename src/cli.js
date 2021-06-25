import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "../main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
  };
}

async function promptMissingOptions(options) {
  const defaultTemplate = "react-ssr";
  if (options.skipPrompts) {
    return {
      ...options,
      template: defaultTemplate,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      name: "template",
      message: "Please project name",
      default: defaultTemplate,
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
  };
}
export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptMissingOptions(options);
  await createProject(options);
}
