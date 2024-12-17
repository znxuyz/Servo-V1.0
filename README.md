# Custom Servo Package

This is a custom servo motor package for MakeCode. It removes the restriction on pins (P0, P1, and P2) and allows servo motors to be controlled on **any pin**.

## Features
- Control servo motors with angles from 0° to 180°.
- Compatible with all digital pins on micro:bit.

## Example Usage

```typescript
customServo.setServo(DigitalPin.P3, 90); // Set servo on pin P3 to 90 degrees
customServo.setServo(DigitalPin.P5, 45); // Set servo on pin P5 to 45 degrees
