import { useState } from "react";

export function countdownTimer() {
    // 设置初始时间为 8 分钟（480 秒）
    const [timecount,setTimeCount] = useState('0');
    const start = (_time: number) => {
        let time = _time;
        // 创建定时器
        const timer = setInterval(function () {
            // 将时间转换为分钟和秒数
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            let res = timecount;
            res = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            setTimeCount(res);
            // 时间减少 1 秒
            time--;

            // 如果时间为 0，停止定时器
            if (time < 0) {
                clearInterval(timer);
                res = '设备使用结束';
                setTimeCount(res);
            }
        },1000);
    }
    return {
        timecount,
        start,
    }
}
