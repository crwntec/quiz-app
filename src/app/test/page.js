"use client";
import { useRef, useEffect } from "react";
import animationData from "../animations/correct.json"
import lottie from 'lottie-web';

export default function Test() {
    const animContainer = useRef(null)
    useEffect(() => {
        lottie.loadAnimation({
          container: animContainer.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/correct.json'
        });
      }, []);
    return (
      <div>
        <div ref={animContainer}></div>
      </div>
    );
  }
  