# pxt-ada

Extension for [MakeCode](https://makecode.com/) to program our robot named *Ada* during [our workshops](https://atelier03.ca/en/workshops/robot-microbit) using the [micro:bit](https://microbit.org/) and the [Motorbit from Elecfreaks](https://www.elecfreaks.com/learn-en/microbitKit/motor_bit_smart_car/motor_bit_v16.html).


> The *Ada* robot is not currently available for sale. We do plan on making the robot or a robot kit available in the future, if interesed, you can be notified through our [newsletter](https://atelier03.ca/en?c=ada#newsletter).

<p align="center">
    <img src="./static/libs/thumbnail.webp" alt="Ada and Laptop" width="50%">
</p>

This extension provides a set of blocks that can be used to control the robot's motors and ultrasound sensor.

<br/>

### Quick example

Control the robot to move forward for 2 seconds, turn left for 1 second, and then stop.

```blocks
ada.forward(50, 2)
ada.turnLeft(50, 1)
```

Use the ultrasonic sensor to stop the robot when an object is within 20 cm.

```blocks
basic.forever(() => {
    if (ada.read_distance(DistanceUnit.CM) < 20) {
        ada.brake()
    } else {
        ada.forward(50, 1)
    }
})
```

### Supported targets

* for PXT/microbit

<br/>

## API Reference

### Motors

```sig
ada.forward(50, 1);
```

Drive both motors forward at a specified power for a set time.

| Parameter  | Type    | Description                               |
|------------|---------|-------------------------------------------|
| speed      | number  | Power (0-100, %), default 50              |
| duration   | number  | Time in seconds to move forward, default 1|

- Left and right motors spin forward at the chosen speed.
- Automatically stops after `duration` seconds.

---

```sig
ada.backwards(50, 1);
```

Drive both motors backward at a specified power for a set time.

| Parameter  | Type    | Description                                 |
|------------|---------|---------------------------------------------|
| speed      | number  | Power (0-100, %), default 50                |
| duration   | number  | Time in seconds to move backward, default 1 |

- Both motors spin in reverse.
- Automatically stops after `duration` seconds.

---

```sig
ada.turnLeft(50, 1);
```

Turn both motors left at a specified power for a set time.

| Parameter  | Type    | Description                                |
|------------|---------|--------------------------------------------|
| speed      | number  | Power (0-100, %), default 50               |
| duration   | number  | Time in seconds to turn, default 1         |

- Both motors rotate to turn left.

---

```sig
ada.turnRight(50, 1);
```


Turn both motors right at a specified power for a set time.

| Parameter  | Type    | Description                                 |
|------------|---------|---------------------------------------------|
| speed      | number  | Power (0-100, %), default 50                |
| duration   | number  | Time in seconds to turn, default 1          |

- Both motors rotate to turn right.

---

```sig
ada.brake();
```

**Stop the motors immediately.**

- Cuts power to both motors.
- Can be used at any time to halt the robot.

---

```sig
ada.set_forward(50);
```

*(Advanced)* Drive both motors forward at a specified power **without timing** (runs until manually stopped).

| Parameter | Type    | Description                    |
|-----------|---------|--------------------------------|
| speed     | number  | Power (0-100, %), default 50   |

---

```sig
ada.set_backwards(50);
```

*(Advanced)* Drive both motors backward at a specified power **without timing** (runs until manually stopped).

| Parameter | Type    | Description                    |
|-----------|---------|--------------------------------|
| speed     | number  | Power (0-100, %), default 50   |

---

```sig
ada.freeroam(50, 50);
```

*(Advanced)* Directly set the speed and direction of each motor.

| Parameter | Type    | Description                                   |
|-----------|---------|-----------------------------------------------|
| left      | number  | Left motor speed (-100 to 100, negative reverses)  |
| right     | number  | Right motor speed (-100 to 100, negative reverses) |

- Values between -100 (full reverse) and 100 (full forward).
- Useful for implementing custom maneuvers or algorithms.

---

### Sensors

```sig
ada.read_distance(DistanceUnit.CM);
```

Read the current distance using an ultrasonic sensor.

| Parameter | Type         | Description                           |
|-----------|--------------|---------------------------------------|
| unit      | DistanceUnit | The unit for returned distance        |

- Triggers the ultrasonic sensor and returns the measured distance.
- Units:
    - `DistanceUnit.Cm`: Distance in centimeters
    - `DistanceUnit.Inches`: Distance in inches
    - `DistanceUnit.Microseconds`: Raw echo time (for custom calculations)

<br/>

---

License MIT