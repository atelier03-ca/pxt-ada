    
enum UltrasoundPins {
    TRIG = DigitalPin.P15,
    ECHO = DigitalPin.P14
} 

//% emitAsConstant
enum DistanceUnit {
    //% block="cm"
    CM = 0,
    //% block="inches"
    INCHES = 1,
    //% block="microseconds"
    MICROSECONDS = 2
}

//% color="#ee7521" weight=100 icon="\uf013" block="ada"
//% groups=['Motors', 'Sensors', 'Others']
namespace ada 
{
    /**
     * Go forward for a certain duration
     * @param speed The speed of the motors, from 0 to 100 percent
     * @param duration The duration to run the motors, in seconds
     */
    //% block="Forward at $speed power for $duration seconds"
    //% speed.min=0 speed.max=100 speed.defl=50
    //% duration.min=0 duration.defl=1
    //% group="Motors" weight=100
    export function forward(speed: number, duration: number) {
        const s = speed * 1023 / 100;

        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 1)

        pins.analogWritePin(AnalogPin.P1, s)
        pins.analogWritePin(AnalogPin.P2, s)

        basic.pause(duration * 1000);
        ada.brake();
    }

    /**
     * Go backwards for a certain duration
     * @param speed The speed of the motors, from 0 to 100 percent
     * @param duration The duration to run the motors, in seconds
     */
    //% block="Backwards at $speed power for $duration seconds"
    //% speed.min=0 speed.max=100 speed.defl=50
    //% duration.min=0 duration.defl=1
    //% group="Motors" weight=99
    export function backwards(speed: number, duration: number) {
        const s = speed * 1023 / 100;

        pins.digitalWritePin(DigitalPin.P8, 1)
        pins.digitalWritePin(DigitalPin.P12, 0)

        pins.analogWritePin(AnalogPin.P1, s)
        pins.analogWritePin(AnalogPin.P2, s)

        basic.pause(duration * 1000);
        ada.brake();
    }

    /**
     * Turn left for a certain duration
     * @param speed The speed of the motors, from 0 to 100 percent
     * @param duration The duration to run the motors, in seconds
     */
    //% block="Turn left at $speed power for $duration seconds"
    //% speed.min=0 speed.max=100 speed.defl=50
    //% duration.min=0 duration.defl=1
    //% group="Motors" weight=90
    export function turnLeft(speed: number, duration: number) {
        const s = speed * 1023 / 100;

        pins.digitalWritePin(DigitalPin.P8, 1)
        pins.digitalWritePin(DigitalPin.P12, 1)

        pins.analogWritePin(AnalogPin.P1, s)
        pins.analogWritePin(AnalogPin.P2, s)

        basic.pause(duration * 1000);
        ada.brake();
    }

    /**
     * Turn right for a certain duration
     * @param speed The speed of the motors, from 0 to 100 percent
     * @param duration The duration to run the motors, in seconds
     */
    //% block="Turn right at $speed power for $duration seconds"
    //% speed.min=0 speed.max=100 speed.defl=50
    //% duration.min=0 duration.defl=1
    //% group="Motors" weight=89
    export function turnRight(speed: number, duration: number) {
        const s = speed * 1023 / 100;

        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 0)

        pins.analogWritePin(AnalogPin.P1, s)
        pins.analogWritePin(AnalogPin.P2, s)

        basic.pause(duration * 1000);
        ada.brake();
    }

    /**
     * Stop the motors
     */
    //% block="Stop the motors" group="Motors" weight=0
    export function brake() {
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 1)

        pins.analogWritePin(AnalogPin.P1, 0)
        pins.analogWritePin(AnalogPin.P2, 0)
    }

    /**
     * Set the motors to a certain power
     * @param power The power of the motors, from -100 to 100 percent
     */
    //% block="Forward at $speed power"
    //% speed.min=0 speed.max=100 speed.defl=50
    //% group="Motors" weight=100
    //% advanced=true
    export function setForward(speed: number) {
        const s = speed * 1023 / 100;

        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 1)

        pins.analogWritePin(AnalogPin.P1, s)
        pins.analogWritePin(AnalogPin.P2, s)
    }

    /**
     * Set the motors to a certain power
     * @param power The power of the motors, from -100 to 100 percent
     */
    //% block="Backwards at $speed power"
    //% speed.min=0 speed.max=100 speed.defl=50
    //% group="Motors" weight=99
    //% advanced=true
    export function setBackwards(speed: number) {
        const s = speed * 1023 / 100;

        pins.digitalWritePin(DigitalPin.P8, 1)
        pins.digitalWritePin(DigitalPin.P12, 0)

        pins.analogWritePin(AnalogPin.P1, s)
        pins.analogWritePin(AnalogPin.P2, s)
    }

    /**
     * Set the motors to a certain power
     * @param left The power of the left motor, from -100 to 100 percent
     * @param right The power of the right motor, from -100 to 100 percent
     */
    //% block="Left motor at $left and right motor at $right"
    //% left.min=-100 left.max=100
    //% right.min=-100 right.max=100
    //% group="Motors" weight=80
    //% advanced=true
    export function freestyle(left: number, right: number): void {
        if (left > 0) {
            pins.digitalWritePin(DigitalPin.P8, 0)
            pins.analogWritePin(AnalogPin.P1, left * 1023 / 100)
        } else {
            pins.digitalWritePin(DigitalPin.P8, 1)
            pins.analogWritePin(AnalogPin.P1, - left * 1023 / 100)
        }

        if (right > 0) {
            pins.digitalWritePin(DigitalPin.P12, 1)
            pins.analogWritePin(AnalogPin.P2, right * 1023 / 100)
        } else {
            pins.digitalWritePin(DigitalPin.P12, 0)
            pins.analogWritePin(AnalogPin.P2, - right * 1023 / 100)
        }
    }

    // --- SENSORS ---
 
    /**
     * Read the distance from the ultrasonic sensor
     * @param unit The unit to return the distance in
     */
    //% block="distance in $unit"
    //% blockId="read_distance"
    //% unit.shadow=read_distance_units
    //% group="Sensors" weight=100
    export function readDistance(unit: DistanceUnit): number {

        // Set trigger to HIGH for 10 microseconds
        pins.digitalWritePin(UltrasoundPins.TRIG, 1);
        control.waitMicros(10);

        pins.digitalWritePin(UltrasoundPins.TRIG, 0);

        // Read echo pin, return distance in cm
        const duration = pins.pulseIn(UltrasoundPins.ECHO, PulseValue.High);
        switch (unit) {
            case DistanceUnit.CM:
                return Math.floor(duration * 0.034 / 2);
            case DistanceUnit.INCHES:
                return Math.floor(duration * 0.0133 / 2);
            case DistanceUnit.MICROSECONDS:
                return duration;
            default:
                return 0;
        }
    }
}