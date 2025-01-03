"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <DotLottieReact
        src="https://lottie.host/fda9334c-2ffe-427d-a24c-7bdf3531ed09/ocmy6FGYYA.lottie"
        loop
        autoplay
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
};

export default loading;
