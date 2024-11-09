import { useScrollPosition, useWindowSize } from "../../hooks/useUserScreen.jsx";
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
          // console.log("check measurements: ", scrollPos, viewSize, totalSize)
          const sectionTop = section.offsetTop;
          const sectionLeft = section.offsetLeft;
          const sectionHeight = section.offsetHeight;
          const sectionWidth = section.offsetWidth;

          // console.log("section widtj", `${( sectionWidth / totalSize.width ) * 100}%`)

          // console.log("section width: ", sectionWidth, totalSize.width)
          // const isCurrent =
          //   scrollPos.y >= sectionTop && scrollPos.y < sectionTop + sectionHeight &&
          //   scrollPos.x >= sectionLeft && scrollPos.x < sectionLeft + sectionWidth;
          const isCurrent = false;

          return (
            <div
              key={index}
              className="mini-map-section"
              style={{
                width: `${( sectionWidth / totalSize.width  ) * 100}%`,
                height: `${( sectionHeight / totalSize.height ) * 100}%`,
                left: `${(  sectionLeft / totalSize.width ) * 100}%`,
                top: `${( sectionTop / totalSize.height  ) * 100}%`,
                backgroundColor: isCurrent ? 'blue' : 'lightgray',
              }}
              onClick={() => window.scrollTo({ top: sectionTop, behavior: 'smooth' })}
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