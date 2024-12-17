// 伺服馬達模組，支援變數控制與最大最小範圍
//% color=#808080 icon="\\uf11e" block="伺服馬達"
namespace servoMotor {

    /**
     * 設定伺服馬達角度
     * @param pin 傳送訊號的腳位
     * @param degrees 角度，範圍 0-180 度
     */
    //% blockId=servo_set_angle block="伺服馬達 %pin| 設定角度 %degrees| 度"
    //% pin.defl=DigitalPin.P0 degrees.min=0 degrees.max=180
    export function setAngle(pin: DigitalPin, degrees: number): void {
        let pulseWidth = 500 + (degrees * 2000) / 180;
        pins.servoWritePin(pin, pulseWidth);
    }

    /**
     * 根據變數調整角度並設置最大值與最小值
     * @param pin 傳送訊號的腳位
     * @param value 輸入的變數值
     * @param min 最小角度，eg: 0
     * @param max 最大角度，eg: 180
     */
    //% blockId=servo_variable_angle block="伺服馬達 %pin| 根據變數 %value| 設角度範圍 %min| 到 %max"
    //% pin.defl=DigitalPin.P0 value.shadow="variables_get" min.min=0 min.max=90 max.min=90 max.max=180
    export function setAngleWithVariable(pin: DigitalPin, value: number, min: number, max: number): void {
        if (min >= 0 && max <= 180 && min < max) {
            let angle = Math.map(value, 0, 100, min, max); // 根據變數縮放到範圍內
            angle = Math.constrain(angle, min, max); // 確保角度在範圍內
            setAngle(pin, angle);
        }
    }

    /**
     * 停止伺服馬達
     * @param pin 傳送訊號的腳位
     */
    //% blockId=servo_stop block="伺服馬達 %pin| 停止"
    //% pin.defl=DigitalPin.P0
    export function stopServo(pin: DigitalPin): void {
        pins.servoWritePin(pin, 1500); // 中性脈衝
    }

    /**
     * 設定脈衝寬度
     * @param pin 傳送訊號的腳位
     * @param pulse 脈衝寬度 (微秒)
     */
    //% blockId=servo_set_pulse block="伺服馬達 %pin| 設定脈衝寬度為 %pulse| 微秒"
    //% pin.defl=DigitalPin.P0 pulse.min=500 pulse.max=2500
    export function setPulse(pin: DigitalPin, pulse: number): void {
        pins.servoWritePin(pin, pulse);
    }
}
