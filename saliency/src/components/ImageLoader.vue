<template>
  <div id="app">
    <h2>Select an image</h2>
    <img id="imgId" :src="image" />
    <img id="inputImg" />
    <img id="outputImg" />
    <input type="file" v-on:change="onFileUpload" />
  </div>
</template>

<script>
// import { WebCam } from 'vue-web-cam';
import * as cv from "opencv.js";
// import * as Utils from "utils";

export default {
  name: "ImageLoader",
  data() {
    return {
      image: "",
    };
  },
  components: {
    // WebCam,
  },
  methods: {
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
            self.printError(
              "Failed to load " + url + " status: " + request.status
            );
          }
        }
      };
      request.send();
    },

    async onFileUpload(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const reader = new FileReader();
      const temp = this;

      reader.onload = (e) => {
        temp.image = e.target.result;
      };

      reader.readAsDataURL(files[0]);

      await new Promise((r) => setTimeout(r, 2000));
      let img = cv.imread("imgId");
      // cv.imshow("inputImg", img);
      let img_copy = img.clone();
      let img_gray = new cv.Mat();

      cv.cvtColor(img, img_gray, cv.COLOR_BGR2GRAY, 0);

      // displays gray image doesn't work bc who knows why
      // cv.imshow(this.$refs.outputImg, img_gray);

      let faces = new cv.RectVector();

      let classifier = new cv.CascadeClassifier(); // initialize classifier
      // print(Utils);
      // let utils = new Utils("errorMessage"); //use utils class
      let faceCascadeFile = "haarcascade_frontalface_default.xml"; // path to xml

      // use createFileFromUrl to "pre-build" the xml
      this.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
        classifier.load(faceCascadeFile); // in the callback, load the cascade from file
      });
      // classifier.load(faceCascadeFile);
      let msize = new cv.Size(0, 0);
      classifier.detectMultiScale(img_copy, faces, 1.2, 6, 0, msize, msize);

      console.log(faces);

      // face = faces[0];

      // let wh_multiplier = (1 - scale) / 2;
      // let x = Math.trunc(x + w * wh_multiplier);
      // let y = Math.trunc(y + h * wh_multiplier);
      // let w = Math.trunc(w * scale);
      // let h = Math.trunc(h * scale);

      // for (let i = 0; i < faces.size(); ++i) {}

      // ----------------------------
      //  img = cv2.imread(img_path)

      //   img_copy = np.copy(img)
      //   img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

      //   gradient_maps = {}
      //   face_imgs = {}
      //   predictions = {}

      //   # Detecting faces in the image using the face_cascade loaded above and storing their coordinates into a list.
      //   faces = face_cascade.detectMultiScale(img_copy, scaleFactor=1.2, minNeighbors=6, minSize=(100, 100))

      //   # Looping through each face found in the image.
      //   for i, (x, y, w, h) in enumerate(faces):
      //       #define gradient and face image arrays for particular face
      //       pred_grad_maps = {}

      //       # Drawing a rectangle around the found face.
      //       face_rect = cv2.rectangle(img_copy, (x, y), (x+w, y+h), (0, 100, 0), thickness=2)

      //       # Predicting the age of the found face using the model loaded above.
      //       x2, y2, w2, h2 = shrink_face_roi(x, y, w, h)
      //       face_roi = img_gray[y2:y2+h2, x2:x2+w2]
      //       face_roi = cv2.resize(face_roi, (200, 200))

      //       #grab greyscaled face image here
      //       face_imgs["face_" + str(i)] = face_roi
      //       face_roi = face_roi.reshape(-1, 200, 200, 1)
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>

