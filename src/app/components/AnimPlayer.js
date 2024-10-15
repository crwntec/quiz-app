"use client";
import dynamic from "next/dynamic";

const AnimPlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default AnimPlayer;
