// 自訂伺服馬達模組 (中文化，灰底顯示)
//% color=#808080 icon="\\uf085" block="自訂伺服馬達"
namespace customServo {

    /**
     * 設定脈衝寬度
     * @param pin 傳送訊號的腳位
     * @param pulse 脈衝寬度 (微秒)
     */
    //% blockId=custom_servo_set_pulse block="伺服馬達 %pin| 設定脈衝寬度為 %pulse| 微秒"
    //% pin.defl=DigitalPin.P0 pulse.min=500 pulse.max=2500
    export function setPulseWidth(pin: DigitalPin, pulse: number): void {
        pins.servoWritePin(pin, pulse);
    }

    /**
     * 設定角度範圍
     * @param pin 傳送訊號的腳位
     * @param min 最小角度
     * @param max 最大角度
     */
    //% blockId=custom_servo_config_range block="伺服馬達 %pin| 設定角度範圍從 %min| 到 %max"
    //% pin.defl=DigitalPin.P0 min.min=0 min.max=90 max.min=90 max.max=180
    export function configureAngleRange(pin: DigitalPin, min: number, max: number): void {
        // 模擬設定角度範圍，實際用途可擴展
        if (min >= 0 && max <= 180 && min < max) {
            basic.showString(`範圍: ${min}-${max}`);
        }
    }

    /**
     * 停止連續旋轉
     * @param pin 傳送訊號的腳位
     */
    //% blockId=custom_servo_stop block="伺服馬達 %pin| 停止"
    //% pin.defl=DigitalPin.P0
    export function stopServo(pin: DigitalPin): void {
        pins.servoWritePin(pin, 1500); // 中性脈衝，停止旋轉
    }

    /**
     * 連續旋轉伺服馬達
     * @param pin 傳送訊號的腳位
     * @param speed 旋轉速度，百分比，eg: 50
     */
    //% blockId=custom_servo_continuous block="伺服馬達 %pin| 持續旋轉，動力設為 %speed| %%"
    //% pin.defl=DigitalPin.P0 speed.min=-100 speed.max=100
    export function continuousRotate(pin: DigitalPin, speed: number): void {
        let pulseWidth = 1500 + (speed * 10);
        pins.servoWritePin(pin, pulseWidth);
    }
}
