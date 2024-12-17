// 伺服馬達模組，支援光敏電阻數據調整角度
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
     * @param value 輸入的變數值 (0-1023)
     * @param min 最小角度，eg: 0
     * @param max 最大角度，eg: 180
     */
    //% blockId=servo_variable_angle block="伺服馬達 %pin| 根據變數 %value| 設角度範圍 %min| 到 %max"
    //% pin.defl=DigitalPin.P0 value.shadow="variables_get" min.min=0 min.max=90 max.min=90 max.max=180
    export function setAngleWithVariable(pin: DigitalPin, value: number, min: number, max: number): void {
        if (min >= 0 && max <= 180 && min < max) {
            let angle = Math.map(value, 0, 1023, min, max); // 光敏電阻數據映射到角度範圍
            angle = Math.constrain(angle, min, max);       // 確保角度在範圍內
            setAngle(pin, angle);                          // 設定角度
        }
    }
}
