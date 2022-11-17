import { useRef, useEffect } from 'react'

const useCanvas = (draw, options = {}) => {
    const canvasRef = useRef(null);

    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas.getContext(options.context || '2d');
        let frameCount = 0;
        let animationFrameId

        const render = ()=>{
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render)
        }

        render()

        //is called right before the component unmount.
        //our animation frame is cancelled after our canvas component unmount.
        return ()=>{
            window.cancelAnimationFrame(animationFrameId)
        }

    },[draw])

    return canvasRef
}

export default useCanvas;