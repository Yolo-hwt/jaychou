import saveAs from "file-saver";
export function downlodDataToLocalFile(docItem, docname, downloadType) {
    let str = docItem;
    if (typeof docItem !== "string") {
        str = JSON.stringify(docItem);
    }
    // console.log(str);
    let strData = new Blob([str], { type: "text/plain;charset=utf-8" });
    saveAs(strData, docname + "." + downloadType);
}
export function downloadPicUrlToLocalImage(picUrl, savename, savetype) {
    saveAs(picUrl, [savename, savetype].join('.'));
}
