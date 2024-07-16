import html2canvas from 'html2canvas';


const takeScreenshot = async (catName: string) => {
    const containerElement = document.getElementById('screencaptureArea');
    if (!containerElement) {
        console.error("Container element not found");
        return;
    }
    const height = document.getElementById('screencaptureArea')!.clientHeight + 8
    setTimeout(() => {
        html2canvas(containerElement, {
            backgroundColor: "#fff7f0",
            height: height,
            width: document.getElementById('screencaptureArea')!.clientWidth + 8,
            scrollY: -window.scrollY,
            windowHeight: height,
            useCORS: true,
            scale: 5
        }).then(canvas => {
            const dataURL = canvas.toDataURL("image/jpeg", 3.0);
            const link = document.createElement("a");
            link.href = dataURL;
            const todayInYYYYMMDD = new Date().toISOString().slice(0, 10);
            link.download = `${catName}-${todayInYYYYMMDD}.jpeg`;
            link.click();
        }).catch(error => {
            console.error("Screenshot error", error);
        });
    }, 2000);
};


export default takeScreenshot;