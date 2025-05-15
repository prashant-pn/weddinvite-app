const fs = require('fs');
const axios = require('axios');
const cron = require('node-cron');

const folderId = '1OEVFnmSnVh3KDR-Ys2xePgWZnzk8PEV_'; // Replace with your Google Drive folder ID
const apiKey = 'AIzaSyD20mpTttVSxTcPQclM2UHKYjjk9gcFcVo'; // Replace with your Google API key

const downloadPhotos = async () => {
  const folderPath = './public/photos';
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  try {
    // Fetch the list of files in the folder
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webContentLink)`;
    const response = await axios.get(url);
    const files = response.data.files;

    // Filter only image files
    const imageFiles = files.filter(file => file.mimeType.startsWith('image/'));

    for (const file of imageFiles) {
      const downloadUrl = file.webContentLink;
      const writer = fs.createWriteStream(`${folderPath}/${file.name}`);
      const fileResponse = await axios.get(downloadUrl, { responseType: 'stream' });
      fileResponse.data.pipe(writer);

      console.log(`Downloaded: ${file.name}`);
    }
  } catch (error) {
    console.error('Error fetching or downloading photos:', error.message);
  }
};

// Schedule the downloadPhotos function to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Running downloadPhotos service...');
  downloadPhotos();
});

// Run the service immediately on startup
downloadPhotos();