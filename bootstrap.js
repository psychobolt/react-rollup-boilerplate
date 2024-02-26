/* eslint-disable no-console */
import path from 'path';
import { execa } from 'execa';

import { rootResolve } from './shared/utils.js';

console.log('Installing main project dependencies....');
await (execa('yarn', ['install'], { stdio: 'inherit' }));
console.log();

const FLOW_DEPS_RESOLVE = path.resolve(rootResolve(), 'packages/flow-deps');
console.log('Installing flow-deps dependencies....');
await (execa('yarn', ['install'], { stdio: 'inherit', cwd: FLOW_DEPS_RESOLVE }));
console.log();
