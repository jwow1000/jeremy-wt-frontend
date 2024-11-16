import { useScrollPosition, useWindowSize } from "../../hooks/useUserScreen.jsx";
import { parseSizeToPixels } from "../../services/conversions.js";
import "./MiniMap.css"; 

function MiniMap({ sections, totalSize }) {
  
  
  // Calculate the height of each section relative to the viewport
  const scrollPos = useScrollPosition();
  const viewSize = useWindowSize();
  // console.log("sections: ", sections, "total size: ", totalSize)

  return (
    <div className="mini-map">
      {
        sections && sections.map((section, index) => {
          const sectionTop = section.obj.offsetTop;
          const sectionLeft = section.obj.offsetLeft;
          const sectionHeight = section.obj.offsetHeight;
          const sectionWidth = section.obj.offsetWidth;

          // console.log("section width: ", sectionWidth, totalSize.width)
         
          // const isCurrent = (
          //   scrollPos.y >= sectionTop && 
          //   scrollPos.y < sectionTop + sectionHeight &&
          //   scrollPos.x >= sectionLeft && 
          //   scrollPos.x < sectionLeft + sectionWidth
          // ) || (
          //   Math.abs(scrollPos.y + viewSize.height / 2 - (sectionTop + sectionHeight / 2)) < sectionHeight * 0.1 &&
          //   Math.abs(scrollPos.x + viewSize.width / 2 - (sectionLeft + sectionWidth / 2)) < sectionWidth * 0.1
          // );
          
          // const isCurrent = false;
          // console.log("isCurrent: ", isCurrent)

          return (
            <div
              key={index}
              className="mini-map-section"
              style={{
                width: `${( sectionWidth / totalSize.width  ) * 100}%`,
                height: `${( sectionHeight / totalSize.height ) * 100}%`,
                left: `${(  sectionLeft / totalSize.width ) * 100}%`,
                top: `${( sectionTop / totalSize.height  ) * 100}%`,
                // backgroundColor: isCurrent ? 'rgb(240,100,100)' : 'lightgray',
              }}
              onClick={() => {
                const centerX = sectionLeft - (viewSize.width / 2) + (sectionWidth / 2);
                const centerY = sectionTop - ( (viewSize.height / 2) - parseSizeToPixels("2rem")) + (sectionHeight / 2);
              
                window.scrollTo({ 
                  top: centerY, 
                  left: centerX,
                  behavior: 'smooth' 
                });
              }}
              
            />
          );
        })
      }
      {
        <div
          id="viewPort-border"
          style={{
            width: `${( viewSize.width / totalSize.width ) * 100}%`,
            height: `${( viewSize.height / totalSize.height ) * 100}%`,
            left: `${( scrollPos.x / totalSize.width) * 100}%`,
            top: `${( scrollPos.y / totalSize.height) * 100}%`,
          }}
        >

        </div>

      }
    </div>
  );
}

export default MiniMap;