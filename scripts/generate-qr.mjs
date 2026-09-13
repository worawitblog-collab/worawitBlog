import QRCode from 'qrcode';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
await mkdir(publicDir, { recursive: true });

const url = 'https://worawitblog.vercel.app/';

const svg = await QRCode.toString(url, { type: 'svg', margin: 2, width: 512, errorCorrectionLevel: 'M' });
const png = await QRCode.toBuffer(url, { type: 'png', margin: 2, width: 512, errorCorrectionLevel: 'M' });

await writeFile(join(publicDir, 'qrcode.svg'), svg);
await writeFile(join(publicDir, 'qrcode.png'), png);

console.log('Generated public/qrcode.svg and public/qrcode.png');