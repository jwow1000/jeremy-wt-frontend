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