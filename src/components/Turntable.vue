<template>
    <div>
        <canvas id="turntable"></canvas>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from "vue-property-decorator"
    @Component({
        name: "turntable",
    })
    export default class Turntable extends Vue{

        colorStyle: any = [
            { level: '特等奖', name: '我的亲笔签名', color: '#576c0a' },
            { level: '未中奖', name: '未中奖', color: '#ad4411' },
            { level: '一等奖', name: '跑车', color: '#43ed04' },
            { level: '未中奖', name: '未中奖', color: '#d5ed1d' },
            { level: '二等奖', name: '辣条一包', color: '#32acc6' },
            { level: '未中奖', name: '未中奖', color: '#e78510' },
            { level: '未中奖', name: '未中奖', color: '#e90570' },
            { level: '未中奖', name: '未中奖', color: '#024580' },
        ]

        startRadian: number = 20

        RadianGap: number = Math.PI * 2 / 8

        canBeClick: boolean = true

        mounted() {
            this.draw()
        }

        draw() {
            const canvas: any = document.querySelector('#turntable')
            const ctx = canvas.getContext('2d')
            // 设置宽高
            canvas.width = 300
            canvas.height = 300

            ctx.save()
            ctx.beginPath()
            ctx.fillStyle = '#FD6961'
            ctx.arc(150, 150, 150, 0, Math.PI * 2, false)
            ctx.fill()
            ctx.restore()

            let  endRadian = this.startRadian + this.RadianGap
            for (let i = 0; i < this.colorStyle.length; i++) {
                ctx.save()
                ctx.beginPath()
                ctx.fillStyle = this.colorStyle[i].color
                ctx.moveTo(150, 150)
                ctx.arc(150, 150, 145, this.startRadian, endRadian, false)
                ctx.fill()
                ctx.restore()
                ctx.save()
                ctx.fillStyle = '#FFFFFF';
                ctx.font = "14px Arial";
                ctx.translate(
                    150 + Math.cos(this.startRadian + this.RadianGap / 2) * 140,
                    150 + Math.sin(this.startRadian + this.RadianGap / 2) * 140
                );
                // 旋转角度,这个旋转是相对于原点进行旋转的.
                ctx.rotate(this.startRadian + this.RadianGap / 2 + Math.PI / 2);
                // 这里就是根据我们获取的各行的文字进行绘制,maxLineWidth我们取70,相当与
                // 一行我们最多展示5个文字
                this.getLineTextList(ctx, this.colorStyle[i].name, 70).forEach((line, index) => {
                    // 绘制文字的方法,三个参数分别带别:要绘制的文字,开始绘制的x坐标,开始绘制的y坐标
                    ctx.fillText(line, -ctx.measureText(line).width / 2, ++index * 25);
                })
                ctx.restore()

                this.startRadian += this.RadianGap
                endRadian += this.RadianGap
            }
            this.drawButton(ctx)
            this.drawArrow(ctx)
            const canvasStyle = canvas.getAttribute('style')
            canvas.addEventListener('mousedown', (e: any) => {
                if (!this.canBeClick) return
                this.canBeClick = false
                let position = this.windowToCanvas(canvas, e)
                ctx.beginPath()
                ctx.arc(150, 150, 30, 0, Math.PI * 2, false)
                if (ctx.isPointInPath(position.x, position.y)) {
                    this.startRadian = 20
                    this.rotatePanel()
                }
            })
            canvas.addEventListener('mousemove', (e: any) => {
                let postion = this.windowToCanvas(canvas, e)
                ctx.beginPath()
                ctx.arc(150, 150, 30, 0, Math.PI * 2, false)
                if (ctx.isPointInPath(postion.x, postion.y)) {
                    canvas.setAttribute('style', `cursor: pointer;${canvasStyle}`)
                } else {
                    canvas.setAttribute('style', canvasStyle)
                }
            })
        }
        getLineTextList(context: any, text: any, maxLineWidth: any) {
            let wordList = text.split(''), tempLine = '', lineList = []
            for (let i = 0; i < wordList.length; i++) {
                // measureText方法是测量文本的宽度的,这个宽度相当于我们设置的
                // fontSize的大小,所以基于这个,我们将maxLineWidth设置为当前字体大小的倍数
                if (context.measureText(tempLine).width >= maxLineWidth) {
                    lineList.push(tempLine)
                    maxLineWidth -= context.measureText(text[0]).width
                    tempLine = ''
                }
                tempLine += wordList[i]
            }
            lineList.push(tempLine)
            return lineList
        }
        drawButton(context: any) {
            context.save()
            context.beginPath()
            context.fillStyle = '#FF0000'
            context.arc(150, 150, 30, 0, Math.PI * 2, false)
            context.fill()
            context.restore()

            context.save()
            context.beginPath()
            context.fillStyle = '#FFF'
            context.font = '20px Arial'
            context.translate(150, 150)
            context.fillText('Start', -context.measureText('Start').width / 2, 8)
            context.restore()
        }
        drawArrow(context: any) {
            context.save()
            context.beginPath()
            context.fillStyle = '#FF0000'
            context.moveTo(140, 125)
            context.lineTo(150, 100)
            context.lineTo(160, 125)
            context.closePath()
            context.fill()
            context.restore()
        }
        rotatePanel() {
            // 每次调用都将初始角度增加1度
            this.startRadian += Math.PI / 180
            console.log(this.startRadian)
            this.draw()
            // 循环调用rotatePanel函数，使得转盘的绘制连续，造成旋转的视觉效果
            window.requestAnimationFrame(this.rotatePanel.bind(this));
        }
        windowToCanvas(canvas: any, e: any) {
            // getBoundingClientRect这个方法返回html元素的大小及其相对于视口的位置
            const canvasPostion = canvas.getBoundingClientRect(), x = e.clientX, y = e.clientY
            return {
                x: x - canvasPostion.left,
                y: y - canvasPostion.top
            }
        }
    }
</script>

<style scoped>

</style>
