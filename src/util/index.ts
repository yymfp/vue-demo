export default {
    /**
     * 将base64转换为blob
     * @param dataURI   url
     * @param type      文件类型
     * @returns         转换后的blob数据
     */
    dataURItoBlob(dataURI: any, type: any) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
    },
}
