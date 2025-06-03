const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 5000;

// Serve the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Start the downloadPhotos service
exec('node client/downloadPhotos.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting downloadPhotos service: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Service stderr: ${stderr}`);
    return;
  }
  console.log(`Service stdout: ${stdout}`);
});

// API endpoint (optional)
app.get('/api', (req, res) => {
  res.send('Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});