#!/usr/bin/env node

import { execSync, spawn } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

process.chdir(dirname(fileURLToPath(import.meta.url)));

const nodeOptions = execSync('yarn node -p process.env.NODE_OPTIONS')
  .toString()
  .slice(0, -1);

const child = spawn('node', [...process.argv.slice(2)], {
  env: {
    ...process.env,
    NODE_OPTIONS: nodeOptions,
  },
  stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
}).on('message', data => {
  if (process.send !== undefined) {
    process.send(data);
  }
});

process.on('message', data => {
  child.send(data);
});
