import React, { useEffect, useRef, useState } from "react";
export default function App() {
    let [color, SetColor] = useState("black");
    let [width, setWidth] = useState(1);
    let [draw, setDraw] = useState(false)
    let canRef = useRef(null);
    let ctxRef = useRef(null);
    function hande(e) {
        SetColor(e.target.value)

    }
    console.log(color)
    useEffect(() => {
        let canvas = canRef.current;
        let c = canvas.getContext("2d");
        c.lineCap = "round";
        c.lineJoin = "round";
        c.strokeStyle = color;
        c.lineWidth = width;
        ctxRef.current = c;





    }, [color])
    console.log(ctxRef)
    function startDrawing(e) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
            // nativeEvent
        )
        setDraw(true)
        console.log(e)
    }
    function endDrawing(e) {
        ctxRef.current.closePath();
        setDraw(false);

    }
    function darws(e) {
        if (!draw) {
            return;
        }
        ctxRef.current.lineTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY


        )
        ctxRef.current.stroke();
    }



    return (
        <>
            <h2 style={{ textAlign: "center" }}>Paint App</h2>
            <hr />
            <div style={{ display: "flex" }}>
                <div style={{ border: "1px solid black", width: "30vw", height: "70vh", textAlign: 'center' }}>
                    <h4>
                        Colors
                    </h4>
                    <input onChange={hande} type="color" /><br />
                    <h4>width</h4>

                    <input onChange={(e) => { setWidth(e.target.value) }} type="number" style={{ width: "50px" }} />

                    
                </div>






                <div style={{ border: "1px solid black", width: "70vw", height: "70vh" }}>
                    <canvas onMouseDown={startDrawing} onMouseUp={endDrawing} onMouseMove={darws} onTouchMove={darws} onTouchStart={startDrawing} onTouchEnd={endDrawing} ref={canRef} style={{ border: "1px solid black", width: "70vw", height: "70vh" }}></canvas>
                </div>
            </div>


        </>
    )
}