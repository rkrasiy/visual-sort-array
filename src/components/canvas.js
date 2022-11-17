import useCanvas from "../useCanvas";


const Canvas = props => {

    // const _postdraw = () => {
    //     index++;
    //     ctx.restore();
    // }
    // const _predraw = (context, canvas)=>{
    //     context.save();
    //     resizeCanvasToDisplaySize(context, canvas);
    //     const {width, height } = context.canvas;
    //     context.clearRect(0,0, width, height);
    // }

    const { draw, options = {}, ...rest } = props
    const {context, ...moreConfig} = options

    const canvasRef = useCanvas(draw, {context});

    return <canvas ref={canvasRef} {...rest} />
}


export default Canvas;