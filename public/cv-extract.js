const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function main() {
  const pdfPath = path.resolve(__dirname, 'CV Leonardo Rocha.pdf');
  if (!fs.existsSync(pdfPath)) {
    console.error('PDF not found at:', pdfPath);
    process.exit(1);
  }
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  const outPath = path.resolve(__dirname, 'cv.txt');
  fs.writeFileSync(outPath, data.text, 'utf8');
  console.log('Extracted text to', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


