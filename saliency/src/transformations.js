import * as tf from '@tensorflow/tfjs';
import { grad } from '@tensorflow/tfjs';

function intensityMap(gradients) {
  return gradients.mul(1 / tf.max(gradients).dataSync()[0]);
}

function binaryMapOverlay(gradients, img, threshold) {
  // const sortedTemp = gradients.reshape(-1)
  const tempGrads = gradients.mul(gradients.greater(threshold));
  return img.mul(gradients);
}
