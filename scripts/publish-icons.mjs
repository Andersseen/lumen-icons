import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const packageDir = join(root, 'packages/icons');
const distDir = join(packageDir, 'dist');
const dryRunOnly = process.argv.includes('--dry-run');
const skipChecks = process.argv.includes('--skip-checks');
const tag = process.env.NPM_TAG ?? 'latest';
const env = {
  ...process.env,
  npm_config_cache: process.env.npm_config_cache ?? join(tmpdir(), 'lumen-icons-npm-cache'),
};

const sourcePkg = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'));
const packageName = sourcePkg.name;
const packageVersion = sourcePkg.version;

function run(command, args, options = {}) {
  console.log(`\n> ${[command, ...args].join(' ')}`);
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? root,
    encoding: 'utf8',
    env,
    stdio: options.capture ? 'pipe' : 'inherit',
  });

  if (options.capture) {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
  }

  if (result.status !== 0 && !options.allowFailure) {
    process.exit(result.status ?? 1);
  }

  return result;
}

function commandOutput(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? root,
    encoding: 'utf8',
    env,
    stdio: 'pipe',
    timeout: options.timeout ?? 5000,
  });

  return {
    ok: result.status === 0,
    output: `${result.stdout ?? ''}${result.stderr ?? ''}${result.error?.message ?? ''}`.trim(),
  };
}

function checkLoggedIn() {
  const result = commandOutput('npm', ['whoami']);
  if (!result.ok) {
    console.warn('\nCould not verify npm login.');
    console.warn('If publish fails with auth errors, run `pnpm run npm:login` and try again.');
    return;
  }
  console.log(`npm user: ${result.output}`);
}

function assertVersionIsAvailable() {
  const result = commandOutput('npm', ['view', `${packageName}@${packageVersion}`, 'version']);
  if (result.ok) {
    console.error(`\n${packageName}@${packageVersion} already exists on npm.`);
    console.error('Bump packages/icons/package.json before publishing again.');
    process.exit(1);
  }

  if (!result.output.includes('E404')) {
    console.warn(`\nCould not verify npm availability for ${packageName}@${packageVersion}.`);
    console.warn('Continuing anyway; npm publish will fail safely if the version already exists.');
    if (result.output) console.warn(result.output);
    return;
  }

  console.log(`${packageName}@${packageVersion} is available.`);
}

async function askOtp() {
  const rl = createInterface({ input, output });
  const otp = (await rl.question('\nnpm OTP code: ')).trim();
  rl.close();

  if (!/^\d{6,8}$/.test(otp)) {
    console.error('OTP should be a 6-8 digit code.');
    process.exit(1);
  }

  return otp;
}

function publish(args) {
  return run('pnpm', ['publish', '--access', 'public', '--tag', tag, '--no-git-checks', ...args], {
    cwd: distDir,
    capture: true,
    allowFailure: true,
  });
}

console.log(`Preparing ${packageName}@${packageVersion} for npm.`);
checkLoggedIn();
assertVersionIsAvailable();

if (!skipChecks) {
  run('pnpm', ['run', 'check']);
} else {
  run('pnpm', ['run', 'check:package']);
}

run('pnpm', ['publish', '--dry-run', '--access', 'public', '--tag', tag, '--no-git-checks'], {
  cwd: distDir,
});

if (dryRunOnly) {
  console.log('\nDry run complete. Nothing was published.');
  process.exit(0);
}

let result = publish([]);
if (result.status !== 0) {
  const outputText = `${result.stdout ?? ''}${result.stderr ?? ''}`;
  if (outputText.includes('EOTP')) {
    const otp = await askOtp();
    result = publish([`--otp=${otp}`]);
  }
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log(`\nPublished ${packageName}@${packageVersion}.`);
console.log(`Install it with: pnpm add ${packageName}`);
