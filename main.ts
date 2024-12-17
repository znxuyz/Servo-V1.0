// Custom Servo Module with Position, Continuous, and Configuration Options
//% color=#ff4500 icon="\\uf085" block="Custom Servo"
namespace customServo {

    /**
     * Set servo angle (position control)
     * @param pin pin to send the signal
     * @param degrees angle to set the servo, eg: 90
     */
    //% blockId=custom_servo_set_position block="servo %pin| set angle to %degrees| degrees"
    //% pin.defl=DigitalPin.P0 degrees.shadow="range" degrees.min=0 degrees.max=180
    export function setPosition(pin: DigitalPin, degrees: number): void {
        let pulseWidth = 500 + (degrees * 2000) / 180;
        pins.servoWritePin(pin, pulseWidth);
    }

    /**
     * Continuous servo rotation
     * @param pin pin to send the signal
     * @param speed rotation speed, eg: 50
     */
    //% blockId=custom_servo_continuous block="servo %pin| rotate continuously at %speed| %% power"
    //% pin.defl=DigitalPin.P0 speed.min=-100 speed.max=100
    export function continuousRotate(pin: DigitalPin, speed: number): void {
        let pulseWidth = 1500 + (speed * 10); // Center at 1500, range ±500 for continuous servo
        pins.servoWritePin(pin, pulseWidth);
    }

    /**
     * Stop continuous rotation
     * @param pin pin to stop the servo
     */
    //% blockId=custom_servo_stop block="servo %pin| stop"
    //% pin.defl=DigitalPin.P0
    export function stopServo(pin: DigitalPin): void {
        pins.servoWritePin(pin, 1500); // Neutral pulse width to stop
    }

    /**
     * Configure pulse range
     * @param pin pin to configure
     * @param min minimum angle
     * @param max maximum angle
     */
    //% blockId=custom_servo_config_range block="servo %pin| set angle range from %min| to %max"
    //% pin.defl=DigitalPin.P0 min.min=0 min.max=90 max.min=90 max.max=180
    export function configureAngleRange(pin: DigitalPin, min: number, max: number): void {
        // Simulate configuration, but ensure values are valid
        if (min >= 0 && max <= 180 && min < max) {
            basic.showString(`Range: ${min}-${max}`);
        }
    }

    /**
     * Set custom pulse width
     * @param pin pin to send the signal
     * @param pulse pulse width in microseconds, eg: 1500
     */
    //% blockId=custom_servo_set_pulse block="servo %pin| set pulse width to %pulse| μs"
    //% pin.defl=DigitalPin.P0 pulse.min=500 pulse.max=2500
    export function setPulseWidth(pin: DigitalPin, pulse: number): void {
        pins.servoWritePin(pin, pulse);
    }
}
