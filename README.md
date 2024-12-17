# 伺服馬達模組

此模組提供伺服馬達的各項控制功能，包括角度控制、停止控制、設置脈衝寬度及根據變數調整角度。

## 功能

1. **設定角度**：控制伺服馬達在 0-180 度間移動。  
2. **根據變數調整角度**：根據變數值設置角度，並允許指定最大與最小角度範圍。  
3. **停止**：停止伺服馬達運轉。  
4. **設置脈衝寬度**：自定義 PWM 脈衝寬度輸出。

## 使用範例

```typescript
// 設定伺服馬達角度為 90 度
servoMotor.setAngle(DigitalPin.P0, 90);

// 根據變數設定角度範圍
let value = 60; // 假設變數值
servoMotor.setAngleWithVariable(DigitalPin.P0, value, 45, 135);

// 停止伺服馬達
servoMotor.stopServo(DigitalPin.P0);

// 設定脈衝寬度為 1500 微秒
servoMotor.setPulse(DigitalPin.P0, 1500);
