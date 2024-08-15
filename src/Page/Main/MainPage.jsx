import React, { useEffect, useRef } from "react";

import RenderObjectFunction from "./Function/RenderObjectFunction";
import RenderTubeObjectFunction from "./Function/RenderTubeObjectFunction";

function MainPage() {
  const mountRef = useRef(null);
  const mountRef2 = useRef(null);

  useEffect(() => {
    RenderObjectFunction({ mountRef: mountRef });
    RenderTubeObjectFunction({ mountRef: mountRef2 });
  }, []);

  return (
    <div>
      <div ref={mountRef}></div>
      <p>three</p>
      <div ref={mountRef2}></div>
    </div>
  );
}

export default MainPage;
