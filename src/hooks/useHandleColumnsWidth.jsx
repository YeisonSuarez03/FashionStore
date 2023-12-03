import React, { useEffect, useState } from 'react'
import { useWindowResize } from './useWindowResize'

export const useHandleColumnsWidth = (baseColumns = 4) => {

    const { currentWidth, isMdBreakpoint } = useWindowResize();
    const [currentSpanCol, setCurrentSpanCol] = useState(8)
    const baseColumnsWidth = 24 / baseColumns

    useEffect(
        () => {
            if (currentWidth >= 1250) {
                setCurrentSpanCol(baseColumnsWidth);
            }
            else if (currentWidth >= 992 && currentWidth < 1250) {
                setCurrentSpanCol(baseColumnsWidth + 2);
            }
            else if (currentWidth >= 800 && currentWidth < 992) {
                setCurrentSpanCol(baseColumnsWidth);
            }
            else if (currentWidth >= 600 && currentWidth < 800) {
                setCurrentSpanCol(baseColumnsWidth + 2);
            }
            /* else if (currentWidth >= 500 && currentWidth < 600) {
                setCurrentSpanCol(baseColumnsWidth + 4);
            } */
            else {
                setCurrentSpanCol(24);
            }
        },
        [currentWidth],
    )
    return {
        currentWidth,
        isMdBreakpoint,
        currentSpanCol,
    }
}
