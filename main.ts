// Custom Servo Module supporting all pins
//% color=#ff4500 icon="\\uf085" block="Custom Servo"
namespace customServo {
    /**
     * Set servo angle on any pin
     * @param pin pin to send the signal
     * @param degrees angle to set the servo, eg: 90
     */
    //% blockId=custom_servo_set block="Set servo at pin %pin| to %degrees degrees"
    //% pin.shadow="dropdown" pin.defl=DigitalPin.P0 degrees.shadow="range" degrees.min=0 degrees.max=180
    //% weight=100
    export function setServo(pin: number, degrees: number): void {
        let pulseWidth = 500 + (degrees * 2000) / 180; // Calculate PWM pulse width
        pins.servoWritePin(pin, pulseWidth);
    }
}
