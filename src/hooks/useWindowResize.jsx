import React, { useState } from 'react'
import { useEffect } from 'react';

export const useWindowResize = (callback) => {
  
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    const [isLgBreakpoint, setIsLgBreakpoint] = useState(window.innerWidth < 1024);
    const [isMdBreakpoint, setIsMdBreakpoint] = useState(window.innerWidth < 768);
    const [isSmBreakpoint, setIsSmBreakpoint] = useState(window.innerWidth < 640);

    const onResize = (e) => {
        setCurrentWidth(e.target.innerWidth);
        setIsLgBreakpoint(e.target.innerWidth < 1024);
        setIsMdBreakpoint(e.target.innerWidth < 768);
        setIsSmBreakpoint(e.target.innerWidth < 640);
        callback && callback(e.target.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", onResize)
    }, [])
    

    return {
        currentWidth,
        isMdBreakpoint,
        isSmBreakpoint,
        isLgBreakpoint
    }

}
