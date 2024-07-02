import { ReactNode } from "react";

export default function Start(props: { children: ReactNode }) {
    return (
        <div
            className={`h-screen w-screen px-5 bg-gradient-1 pb-10 relative`}
            style={{ maxWidth: 393, margin: "0 auto", maxHeight: "100vh", overflow: "hidden"}}
        >
            <div className="absolute bg-gradient-start-1 flex justify-center items-end" style={{
                borderRadius: 584,
                width: 584,
                height: 433,
                bottom: -50,
                right: "-25%",
                zIndex: 0
            }}>
                <div className="bg-gradient-start-2" style={{
                    width: 532,
                    height: 394,
                    borderRadius: 532,
                    bottom: 0
                }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1000 }}>
                {props.children}
            </div>
        </div>
    );
}