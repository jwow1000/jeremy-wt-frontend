// extract youtube id from all sorts of endpoints
export const youtube_parser =  function ( url ){
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  if(url) {
    const match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : null;
  } else {
    return null;
  }
}

// convert a video embed link (youtube) into a preview image
export const convertVid = function( path ) {
  
  const videoId = youtube_parser(path);
  let imageURL = "../images/noFind.png";
  if(videoId) {
      imageURL = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`; // get the image URL
      // imageURL = `https://img.youtube.com/vi_webp/${videoId}/hqdefault.webp`;
  } 
  return imageURL;

}

/**
 * Converts a CSS size string (e.g., "20rem", "50px", "2em") to a numeric pixel value.
 * @param {string} sizeStr - The size string (e.g., "20rem", "50px", "2em").
 * @returns {number} The size in pixels, or NaN if the input is invalid.
 */
export function parseSizeToPixels(sizeStr) {
  // Extract the numeric value and unit from the string
  const match = sizeStr.match(/^([\d.]+)(\w+)$/);
  if (!match) return NaN;

  const [_, value, unit] = match;
  const numericValue = parseFloat(value);

  // Convert based on the unit
  if (unit === "px") {
    return numericValue;
  } else if (unit === "rem") {
    // Get the root font-size (default is 16px in most browsers)
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return numericValue * rootFontSize;
  } else if (unit === "em") {
    // For `em`, get the font-size of the element's context (usually the parent element)
    // This assumes that `sizeStr` is used within an element's computed style
    const parentFontSize = parseFloat(getComputedStyle(document.body).fontSize);
    return numericValue * parentFontSize;
  } else if (unit === "%") {
    // For `%`, assume it refers to a percentage of the parent element's size
    // Modify this according to your layout needs
    return numericValue * 0.01 * document.body.clientWidth; // Example, % width of body
  }

  // If you encounter a unit you don't handle, return NaN
  return NaN;
}

// // Example usage
// console.log(parseSizeToPixels("20rem")); // Converts to  pixels based on the root font size
// console.log(parseSizeToPixels("50px"));  // 50
// console.log(parseSizeToPixels("0.5em")); // Converts to pixels based on the parent font size
const ids = {
  3: "Sculpture",
  2: "Object",
  8: "Sound Sculpture",
  11: "Print",
  9: "Fabric Work",
  10: "Installation",
  12: "Radio Show",
  4: "Sound",
  5: "Video",

}

export function categoryIdToName( id ) {
  return ids[id];
}

// Function to get the ID from the name (slug)
export function categoryNameToId(slug) {
  // Reverse the ids object for quick lookup
  const reversedIds = Object.entries(ids).reduce((acc, [key, value]) => {
    acc[value] = parseInt(key, 10); // Convert keys to integers
    return acc;
  }, {});

  return reversedIds[slug];
}
