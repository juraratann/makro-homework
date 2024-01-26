const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'ddgs1x2k5', 
  api_key: '818935393495949', 
  api_secret: '***************************' 
});

module.exports = cloudinary;