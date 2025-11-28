// src/utils/imagekitUpload.js
import ImageKit from "imagekit-javascript";

const imagekit = new ImageKit({
  publicKey: "public_srD4jKY9NUw5C8RdD5Tq9/Hh6iY=",
  urlEndpoint: "https://ik.imagekit.io/wb2gbl86z",
  authenticationEndpoint: ""
});

/**
 * Upload 1 file lên ImageKit và trả về URL ảnh
 */
export function uploadImageKitFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("File is required"));

    imagekit.upload(
      {
        file,
        fileName: `${Date.now()}-${file.name}`, 
      },
      function (err, result) {
        if (err) reject(err);
        else resolve(result.url); // trả về URL trực tiếp
      }
    );
  });
}
