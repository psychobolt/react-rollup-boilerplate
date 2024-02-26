import yargs from 'yargs';
import micromatch from 'micromatch';
import appRoot from 'app-root-path';
import { Configuration, Project } from '@yarnpkg/core';

import { normalizePath } from './shared/utils.js';

const { argv } = yargs(process.argv.slice(2));

let PACKAGES;
const EXCLUDES = new Set();
const INCLUDES = new Set();
let MAIN_PROJECT;

export const getExcludes = () => [...EXCLUDES];

export const getIncludes = () => [...INCLUDES];

export async function setup() {
  if (MAIN_PROJECT) return;

  PACKAGES = (process.env.PACKAGES || '*').trim();
  EXCLUDES.clear();
  INCLUDES.clear();

  if (PACKAGES) {
    PACKAGES.split(/\s*(?:,|\n|\s)+\s*/).forEach(pattern => {
      if (pattern.startsWith('!')) {
        EXCLUDES.add(pattern.substring(1));
      } else {
        INCLUDES.add(pattern);
      }
    });
  }

  const configuration = await Configuration.find(normalizePath(appRoot), null);
  const { projectCwd } = configuration;
  const project = new Project(projectCwd, { configuration });
  await project.setupWorkspaces();
  MAIN_PROJECT = project;
}

export async function getProjects(isPublic) {
  await setup();
  return isPublic
    ? MAIN_PROJECT.workspaces.filter(({ manifest }) => !manifest.private)
    : MAIN_PROJECT.workspaces;
}

export async function getPackageName(cwd) {
  await setup();
  if (MAIN_PROJECT) {
    const { manifest: { name: { name, scope } } } = MAIN_PROJECT.getWorkspaceByCwd(cwd);
    return scope ? `@${scope}/${name}` : name;
  }
  return null;
}

if (argv.lsPublic) {
  await (setup());

  const includes = getIncludes();
  const excludes = getExcludes();
  const workspaces = [];

  MAIN_PROJECT.workspaces.forEach(({ cwd, manifest }) => {
    const { name: { name } } = manifest;
    if (manifest.private) {
      return;
    }
    const strings = [name, cwd.replace(`${appRoot}/`, '')];
    if (micromatch.some(strings, includes) && !micromatch.some(strings, excludes)) {
      workspaces.push({
        name,
        path: cwd,
      });
    }
  });

  console.log(JSON.stringify(workspaces)); // eslint-disable-line no-console
}
