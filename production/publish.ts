import archiver from 'archiver';
import chalk from 'chalk';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

if (!process.env.PLATFORM_NAME || !process.env.MODULE_NAME || !process.env.MODULE_KEY) {
  console.error(chalk.redBright('❌ Missing required environment variables!'));
  process.exit(1);
}

const PLATFORM_NAME = process.env.PLATFORM_NAME;
const MODULE_NAME = process.env.MODULE_NAME;
const MODULE_KEY = process.env.MODULE_KEY;

const DIST_DIR = path.resolve(__dirname, '../dist');
const BUILD_DIR = path.resolve(__dirname, '../build');
const TARGET_DIR = path.join(DIST_DIR, 'js/bundle');
const ZIP_PATH = path.join(DIST_DIR, 'theme.zip');

async function main() {
  console.log(chalk.cyanBright('🚀 Starting deployment script...\n'));

  if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(TARGET_DIR, { recursive: true });
  console.log(chalk.gray('✔ Cleaned previous dist directory'));

  fs.copyFileSync(__dirname + '/preview_100x60.jpg', path.join(DIST_DIR, 'preview_100x60.jpg'));
  fs.copyFileSync(__dirname + '/theme.info', path.join(DIST_DIR, 'theme.info'));
  fs.cpSync(BUILD_DIR, TARGET_DIR, { recursive: true });
  console.log(chalk.gray('✔ Copied build files'));

  await new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(ZIP_PATH);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(chalk.gray(`✔ Created zip (${archive.pointer()} bytes)`));
      resolve();
    });

    archive.on('error', (err) => reject(err));
    archive.pipe(output);
    archive.directory(DIST_DIR, false);
    archive.finalize();
  });

  console.log(chalk.yellowBright('\n📡 Uploading to platform...'));

  const formData = new FormData();
  formData.append('v', '2.0');
  formData.append('o', 'global');
  formData.append('f', 'customTheme');

  const zipBuffer = fs.readFileSync(ZIP_PATH);
  const zipBlob = new Blob([new Uint8Array(zipBuffer)], { type: 'application/zip' });
  formData.append('theme_zip', zipBlob, 'theme.zip');

  const response = await fetch(`https://${PLATFORM_NAME}/api/api.php`, {
    method: 'POST',
    headers: {
      'X-Com-Jamespot-Module-Name': MODULE_NAME,
      'X-Com-Jamespot-Module-Key': MODULE_KEY,
    },
    body: formData,
  });

  const result = await response.json();
  console.log(chalk.whiteBright('Server response:'));
  console.log(result);
  if (result.RC.CODE === 0) {
    console.log(chalk.greenBright('\n✅ Upload complete!'));
  } else {
    console.error(chalk.redBright('\n❌ Upload error'));
}

main().catch((err) => {
  console.error(chalk.redBright('\n❌ Deployment failed:'));
  console.error(err);
  process.exit(1);
});
