namespace ServoMotor {

    /**
     * 設置伺服馬達腳位 %pin 的角度為 %angle 度
     */
    //% block="伺服馬達 %pin 角度設為 %angle 度"
    //% angle.min=0 angle.max=180
    export function setServoAngle(pin: AnalogPin, angle: number): void {
        pins.servoWritePin(pin, angle);
    }

    /**
     * 設定伺服馬達 %pin 最大角度 %maxAngle 和最小角度 %minAngle
     */
    //% block="伺服馬達 %pin 設定最大角度 %maxAngle 最小角度 %minAngle"
    //% maxAngle.min=0 maxAngle.max=180
    //% minAngle.min=0 minAngle.max=180
    export function setServoLimits(pin: AnalogPin, maxAngle: number, minAngle: number): void {
        let value = pins.analogReadPin(pin);
        let mappedAngle = pins.map(value, 0, 1023, minAngle, maxAngle);
        pins.servoWritePin(pin, mappedAngle);
    }

    /**
     * 根據類比訊號變化伺服馬達角度
     */
    //% block="伺服馬達 %pin 根據類比訊號數值最大 %maxValue 最小 %minValue 改變角度最大 %maxAngle 最小 %minAngle"
    //% maxAngle.min=0 maxAngle.max=180
    //% minAngle.min=0 minAngle.max=180
    export function controlServoByAnalog(
        pin: AnalogPin,
        maxValue: number,
        minValue: number,
        maxAngle: number,
        minAngle: number
    ): void {
        let value = pins.analogReadPin(pin);
        let mappedAngle = pins.map(value, minValue, maxValue, minAngle, maxAngle);
        pins.servoWritePin(pin, mappedAngle);
    }

    /**
     * 伺服馬達 %pin 在 %duration 秒內旋轉到 %angle 度
     */
    //% block="伺服馬達 %pin 在 %duration 秒內旋轉到 %angle 度"
    //% angle.min=0 angle.max=180
    export function moveServoSmoothly(pin: AnalogPin, duration: number, angle: number): void {
        let currentAngle = pins.analogReadPin(pin);
        let steps = 50; // 減少跳動
        let stepDelay = (duration * 1000) / steps;
        let stepChange = (angle - currentAngle) / steps;

        for (let i = 0; i <= steps; i++) {
            pins.servoWritePin(pin, currentAngle + i * stepChange);
            basic.pause(stepDelay);
        }
    }
}
