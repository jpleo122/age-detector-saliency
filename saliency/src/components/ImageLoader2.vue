<template>
  <body>
    <h2>Saliency</h2>
    <input type="file" id="fileInput" name="file" accept="image/*" />
    <button id="tryIt">Try it</button>
    <table>
      <tr>
        <th>
          <canvas id="canvasInput"></canvas>
        </th>
      </tr>
      <tr>
        <th>
          <span style="font-size: 100px">&#8595;</span>
        </th>
      </tr>
      <tr>
        <th>
          <canvas id="canvasGray"></canvas>
        </th>
      </tr>
      <tr>
        <th>
          <span style="font-size: 100px">&#8595;</span>
        </th>
      </tr>
      <tr>
        <th>
          <canvas id="canvasGrayBounded"></canvas>
        </th>
      </tr>
      <tr>
        <th>
          <span style="font-size: 100px">&#8595;</span>
        </th>
      </tr>
      <tr>
        <th>
          <canvas id="canvasGrayCropped"></canvas>
        </th>
      </tr>
      <tr>
        <th>
          <span style="font-size: 100px">&#8595;</span>
        </th>
      </tr>
      <tr>
        <th>
          <canvas id="canvasGrayCroppedResized"></canvas>
        </th>
      </tr>
    </table>
  </body>
</template>

<script>
import * as cv from "opencv.js";

export default {
  name: "ImageLoader2",
  data: function() {
    return {
      transformed: "",
    };
  },
  methods: {
    detect() {
      let src = cv.imread("canvasInput");
      let gray = new cv.Mat();
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
      let grayBounded = gray.clone();
      let faces = new cv.RectVector();

      let faceCascade = new cv.CascadeClassifier();

      // load pre-trained classifiers
      faceCascade.load("haarcascade_frontalface_default.xml");

      // detect faces
      let msize = new cv.Size(0, 0);
      faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
      let face = faces.get(0);

      let point1 = new cv.Point(face.x, face.y);
      let point2 = new cv.Point(face.x + face.width, face.y + face.height);

      console.log(face);

      cv.rectangle(grayBounded, point1, point2, [255, 0, 0, 255]);

      let grayCropped = gray.roi(face);

      let shrinked_face = this.shrink_face_roi(
        face.x,
        face.y,
        face.width,
        face.height
      );

      let grayCroppedResized = gray.roi(shrinked_face);
      let dsize = new cv.Size(200, 200);
      cv.resize(
        grayCroppedResized,
        grayCroppedResized,
        dsize,
        0,
        0,
        cv.INTER_AREA
      );

      cv.imshow("canvasGray", gray);
      cv.imshow("canvasGrayBounded", grayBounded);
      cv.imshow("canvasGrayCropped", grayCropped);
      cv.imshow("canvasGrayCroppedResized", grayCroppedResized);

      this.transformed = grayCroppedResized;

      src.delete();
      gray.delete();
      grayBounded.delete();
      grayCropped.delete();
      grayCroppedResized.delete();
      faceCascade.delete();
      faces.delete();
    },

    shrink_face_roi(x, y, w, h) {
      let scale = 0.9;
      let wh_multiplier = (1 - scale) / 2;
      return {
        x: Math.trunc(x + w * wh_multiplier),
        y: Math.trunc(y + h * wh_multiplier),
        width: Math.trunc(w * scale),
        height: Math.trunc(h * scale),
      };
    },

    createFileFromUrl(path, url, callback) {
      let request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      request.onload = function (ev) {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let data = new Uint8Array(request.response);
            cv.FS_createDataFile("/", path, data, true, false, false);
            callback();
          } else {
            console.log("Failed to load " + url + " status: " + request.status);
          }
        }
      };
      request.send();
    },

    loadImageToCanvas(url, cavansId) {
      let canvas = document.getElementById(cavansId);
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = url;
    },

    addFileInputHandler(fileInputId, canvasId) {
      let inputElement = document.getElementById(fileInputId);
      inputElement.addEventListener(
        "change",
        (e) => {
          let files = e.target.files;
          if (files.length > 0) {
            let imgUrl = URL.createObjectURL(files[0]);
            this.loadImageToCanvas(imgUrl, canvasId);
          }
        },
        false
      );
    },
  },

  mounted() {
    this.addFileInputHandler("fileInput", "canvasInput");

    let tryIt = document.getElementById("tryIt");
    tryIt.addEventListener("click", () => {
      this.detect();
      this.$emit("image-transformed", this.transformed);
    });

    let faceCascadeFile = "../../models/haarcascade_frontalface_default.xml";
    this.createFileFromUrl(
      "haarcascade_frontalface_default.xml",
      faceCascadeFile
    );
  },
};
</script>

<style>
</style>