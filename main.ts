// 伺服馬達模組，支援角度控制、根據變數調整角度，並提供軟體 PWM 模擬功能
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
        let pulseWidth = 500 + (degrees * 2000) / 180; // 轉換角度到脈衝寬度 (500-2500 μs)
        pins.servoWritePin(pin, pulseWidth);          // 輸出脈衝
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
            let angle = Math.map(value, 0, 1023, min, max); // 將輸入值映射到角度範圍
            angle = Math.constrain(angle, min, max);       // 確保角度在範圍內
            setAngle(pin, angle);
        }
    }

    /**
     * 使用軟體 PWM 模擬控制伺服馬達角度
     * @param pin 傳送訊號的腳位
     * @param degrees 角度，範圍 0-180 度
     * @param cycles 重複輸出的週期數，eg: 50
     */
    //% blockId=servo_soft_pwm block="軟體 PWM %pin| 設定角度 %degrees| 重複 %cycles| 週期"
    //% pin.defl=DigitalPin.P0 degrees.min=0 degrees.max=180 cycles.defl=50
    export function softPWM(pin: DigitalPin, degrees: number, cycles: number): void {
        let pulseWidth = 500 + (degrees * 2000) / 180; // 計算脈衝寬度
        let period = 20000; // 20ms 週期 (標準伺服馬達頻率為 50Hz)
        let highTime = pulseWidth;  
        let lowTime = period - highTime;

        // 重複輸出 PWM 訊號
        for (let i = 0; i < cycles; i++) {
            pins.digitalWritePin(pin, 1); // 設為高電位
            control.waitMicros(highTime); // 高電平時間
            pins.digitalWritePin(pin, 0); // 設為低電位
            control.waitMicros(lowTime);  // 低電平時間
        }
    }

    /**
     * 停止伺服馬達
     * @param pin 傳送訊號的腳位
     */
    //% blockId=servo_stop block="伺服馬達 %pin| 停止"
    //% pin.defl=DigitalPin.P0
    export function stopServo(pin: DigitalPin): void {
        pins.servoWritePin(pin, 1500); // 中性脈衝，停止伺服馬達運動
    }
}
