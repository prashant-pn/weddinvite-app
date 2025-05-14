const fs = require('fs');
const axios = require('axios');

const photos = [
  {
    name: 'PP1.jpeg',
    url: 'https://drive.google.com/uc?id=1BWmmQrAhG4tXdCwfnRfCHI7tG2FFQVm3&export=download',
  },
  {
    name: 'PP2.jpeg',
    url: 'https://drive.google.com/uc?id=1qwe0GpgFKt85WefM2YBwKHRzE49HYpFW&export=download',
  },
  {
    name: 'PP3.jpeg',
    url: 'https://drive.google.com/uc?id=1noKBDnNGxG5utR4BSTDG1gfxLR3qEIvE&export=download',
  },
];

const downloadPhotos = async () => {
  const folderPath = './public/photos';
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  for (const photo of photos) {
    const response = await axios.get(photo.url, { responseType: 'stream' });
    const writer = fs.createWriteStream(`${folderPath}/${photo.name}`);
    response.data.pipe(writer);
    console.log(`Downloaded: ${photo.name}`);
  }
};

downloadPhotos();