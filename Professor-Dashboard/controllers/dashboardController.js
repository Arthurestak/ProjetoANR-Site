const fs = require('fs');
const path = require('path');
const multer = require('multer');

const dataPath = path.join(__dirname, '../materiais.json');
const uploadFolder = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// ✅ Leitura com fallback e tratamento de erros
function readData() {
  if (!fs.existsSync(dataPath)) return { pdfs: [], videos: [] };

  try {
    const content = fs.readFileSync(dataPath, 'utf8');
    return content ? JSON.parse(content) : { pdfs: [], videos: [] };
  } catch (err) {
    console.error('Erro ao ler materiais.json:', err);
    return { pdfs: [], videos: [] };
  }
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

exports.index = (req, res) => res.render('index');
exports.uploadForm = (req, res) => res.render('upload');

exports.addPDF = (req, res) => {
  const { pdfName } = req.body;
  const filePath = `/uploads/${req.file.filename}`;
  const db = readData();
  db.pdfs.push({ name: pdfName, link: filePath });
  writeData(db);
  res.redirect('/');
};

exports.addVideo = (req, res) => {
  let { videoTitle, videoURL } = req.body;

  // Verificação e conversão para link embed do YouTube
  const embedRegex = /^https:\/\/www\.youtube\.com\/embed\/[\w-]+$/;
  const watchRegex = /^https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/;
  const shortRegex = /^https:\/\/youtu\.be\/([\w-]+)/;

  if (!embedRegex.test(videoURL)) {
    const match =
      videoURL.match(watchRegex) ||
      videoURL.match(shortRegex);

    if (match && match[1]) {
      const videoId = match[1];
      videoURL = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  const db = readData();
  db.videos.push({ title: videoTitle, url: videoURL });
  writeData(db);
  res.redirect('/');
};

const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

exports.uploader = multer({ storage }).single('pdfFile');