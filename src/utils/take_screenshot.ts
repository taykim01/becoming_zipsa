import html2canvas from 'html2canvas';

const hideElements = (ids: string[]) => {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
};

const showElements = (ids: string[]) => {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = '';
        }
    });
};

const takeScreenshot = async (catName: string) => {
    const containerElement = document.getElementById('screencaptureArea');
    if (!containerElement) return;


    const elementsToHide = ["heart0", "heart1", "heart2", "heart3"];
    hideElements(elementsToHide);


    const height = containerElement.clientHeight + 8;
    const width = containerElement.clientWidth + 8;
    containerElement.style.minHeight = height + "px";

    setTimeout(() => {
        html2canvas(containerElement, {
            backgroundColor: "#fff7f0",
            height: height,
            width: width,
            scrollY: -window.scrollY,
            windowHeight: height,
            useCORS: true,
            scale: 5
        }).then(canvas => {
            const dataURL = canvas.toDataURL("image/png", 3.0);
            const link = document.createElement("a");
            link.href = dataURL;
            const todayInYYYYMMDD = new Date().toISOString().slice(0, 10);
            link.download = `${catName}-${todayInYYYYMMDD}.png`;
            link.click();
        }).catch(error => {
            console.error("Screenshot error", error);
        }).finally(() => {
            showElements(elementsToHide);
        });
    }, 2000);
};

export default takeScreenshot;