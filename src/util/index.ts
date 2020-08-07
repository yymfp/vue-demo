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
    /**
     * 通过动态创建a标签进行跳转
     * @param url        {String}       要跳转的url值
     * @returns          {*}            无返回值
     */
    openUrl(url: string) {
        if (!url) {
            return
        }
        let linkA = document.createElement('a')
        linkA.target = '_blank'
        // 通过设置rel属性值，避免子页面取到源页面的window对象
        linkA.setAttribute('rel', 'noopener noreferrer')
        linkA.href = url
        linkA.click()
    },
}
