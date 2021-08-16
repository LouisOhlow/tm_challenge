function getFilter(pixelArray, filter) {
  switch (filter) {
    case "blackWhite":
      return applyBlackAndWhite(pixelArray);
    case "noRed":
      return applyFilterRed(pixelArray);
    case "noGreen":
      return applyFilterGreen(pixelArray);
    default:
      return pixelArray;
  }
}

function applyBlackAndWhite(pixelArray) {
  const filteredPixelArray = [];
  for (let i = 0; i < pixelArray.length; i += 4) {
    const red = pixelArray[i];
    const green = pixelArray[i + 1];
    const blue = pixelArray[i + 2];

    const greyVal = (red + green + blue) / 3;

    filteredPixelArray[i] = greyVal;
    filteredPixelArray[i + 1] = greyVal;
    filteredPixelArray[i + 2] = greyVal;
    filteredPixelArray[i + 3] = 256;
  }
  return filteredPixelArray;
}

function applyFilterRed(pixelArray) {
  const filteredPixelArray = [];
  for (let i = 0; i < pixelArray.length; i += 4) {
    const green = pixelArray[i + 1];
    const blue = pixelArray[i + 2];

    filteredPixelArray[i] = 0;
    filteredPixelArray[i + 1] = green;
    filteredPixelArray[i + 2] = blue;
    filteredPixelArray[i + 3] = 256;
  }
  return filteredPixelArray;
}

function applyFilterGreen(pixelArray) {
  const filteredPixelArray = [];
  for (let i = 0; i < pixelArray.length; i += 4) {
    const red = pixelArray[i];
    const blue = pixelArray[i + 2];

    filteredPixelArray[i] = red;
    filteredPixelArray[i + 1] = 0;
    filteredPixelArray[i + 2] = blue;
    filteredPixelArray[i + 3] = 256;
  }
  return filteredPixelArray;
}

export { getFilter };
