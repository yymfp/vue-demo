import axios from 'axios'
import util from './index'
export default {
    /**
     * 图片压缩
     * @param   origin      目标图片
     * @param   maxSize  最大尺寸
     * @returns             返回处理后的图片
     */
    compressionImg(origin: any, maxSize: any, fileList: any, _this: any) {

        return new Promise((resolve, reject) => {
            // 创建 FileReader对象用于读取计算机中的文件
            const reader = new FileReader()
            const img = new Image()

            // 读取文件
            if (origin) {
                reader.readAsDataURL(origin)
            }

            // 读取文件成功时的回调
            reader.onload = (e: any) => {
                img.src = e.target.result

                img.onload = function () {
                    const canvas = document.createElement('canvas')
                    const context: any = canvas.getContext('2d')

                    // 原始尺寸
                    const originWidth = img.width
                    const originHeight = img.height

                    // 最大尺寸
                    const maxWidth = maxSize.width
                    const maxHeight = maxSize.height

                    // 目标尺寸
                    let targetWidth = originWidth
                    let targetHeight = originHeight

                    if (originWidth > maxWidth || originHeight > maxHeight) {
                        if (originHeight / originWidth > maxHeight / maxWidth) {
                            targetWidth = maxWidth
                            targetHeight = Math.round(targetWidth * (maxHeight / maxWidth))
                        } else {
                            targetHeight = maxHeight
                            targetWidth = Math.round(targetHeight * (maxWidth / maxHeight))
                        }
                    }

                    // 设置缩放后尺寸
                    canvas.width = targetWidth
                    canvas.height = targetHeight

                    // 清除画布
                    context.clearRect(0, 0, targetWidth, targetHeight)

                    // 图片压缩
                    context.drawImage(img, 0, 0, targetWidth, targetHeight)

                    const newURL = canvas.toDataURL(origin.type)
                    const blobData = util.dataURItoBlob(newURL, origin.type)
                    resolve(blobData)

                    fileList.push({
                        url: newURL
                    })
                }
            }
        })
    }
}
