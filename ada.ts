//% color="#ee7521" weight=100 icon="\uf013" block="ada"
//% groups=['Motors', 'Ultrasound', 'Color Sensor']
namespace ada 
{

    export enum DistanceUnit {
        //% block="cm"
        Cm = 0,
        //% block="inches"
        Inches = 1,
        //% block="microseconds"
        Microseconds = 2
    };

    /**
     * Go forward for a certain duration
     * @param speed The speed of the motors, from 0 to 100 percent
     * @param duration The duration to run the motors, in seconds
     */
    //% block="forward at $speed power for $duration seconds"
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
    //% block="backwards at $speed power for $duration seconds"
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
    //% block="turn left at $speed power for $duration seconds"
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
    //% block="turn right at $speed power for $duration seconds"
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
    //% block="stop the motors" group="Motors" weight=0
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
    //% block="forward at $speed power"
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
    //% block="backwards at $speed power"
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
    //% block="left motor at $left and right motor at $right"
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
    
    enum UltrasoundPins {
        Trig = DigitalPin.P15,
        Echo = DigitalPin.P14
    }; 
    
    /**
     * Read the distance from the ultrasonic sensor
     * @param unit The unit to return the distance in
     */
    //% block="distance in $unit"
    //% group="Ultrasound" weight=100
    export function readDistance(unit: ada.DistanceUnit): number {

        // Set trigger to HIGH for 10 microseconds
        pins.digitalWritePin(UltrasoundPins.Trig, 1);
        control.waitMicros(10);

        pins.digitalWritePin(UltrasoundPins.Trig, 0);

        // Read echo pin, return distance in cm
        const duration = pins.pulseIn(UltrasoundPins.Echo, PulseValue.High);
        switch (unit) {
            case ada.DistanceUnit.Cm:
                return Math.floor(duration * 0.034 / 2);
            case ada.DistanceUnit.Inches:
                return Math.floor(duration * 0.0133 / 2);
            case ada.DistanceUnit.Microseconds:
                return duration;
            default:
                return 0;
        }
    }

    // color sensor
    const TCS34725_ADDR = 0x29;
    const CMD_BIT = 0x80;
    let initialized = false;

    export enum ledState {
        //% block="on"
        On = 1,
        //% block="off"
        Off = 0
    }

    export enum tcs3472RGBChannel {
        //% block="Red"
        Red = 0,
        //% block="Green"
        Green = 1,
        //% block="Blue"
        Blue = 2
    }

    function writeReg(reg: number, val: number) {
        pins.i2cWriteNumber(TCS34725_ADDR, CMD_BIT | reg << 8 | val, NumberFormat.UInt16BE);
    }

    function read16(reg: number): number {
        pins.i2cWriteNumber(TCS34725_ADDR, CMD_BIT | reg, NumberFormat.UInt8BE, false);

        let data = pins.i2cReadBuffer(TCS34725_ADDR, 2);
        return data[0] | (data[1] << 8);
    }

    function enableSensor() {
        if (initialized) return
        writeReg(0x00, 0x01); // PON: Power on
        basic.pause(3);
        writeReg(0x00, 0x03); // PON + AEN: Enable RGBC
        basic.pause(50); // Wait for at least one integration cycle (safe for most configs)
        initialized = true
    }

    /**
     * Reads RGB values, returns array [r, g, b]
     */
    function readRGB(): number[] {
        enableSensor()
        let r = read16(0x16)
        let g = read16(0x18)
        let b = read16(0x1A)
        return [r, g, b]
    }

    /**
     * Returns true if detected color matches the selected color within tolerance.
     * @param color color to compare (as hex), eg: #00ff00
     * @param tolerance allowed color distance (default 60)
     */
    //% block="is reading color $color with a sensibility of $tolerance"
    //% color.shadow="colorNumberPicker"
    //% tolerance.defl=120
    //% tolerance.min=10 tolerance.max=200
    //% group="Color Sensor" weight=80
    export function isReadingColorWithTolerance(color: number, tolerance: number): boolean {
        let vals = readRGB()
        // Sensor values can be high; normalize to 0-255
        let maxVal = Math.max(vals[0], Math.max(vals[1], Math.max(vals[2], 1)));
        let r = Math.floor(vals[0] * 255 / maxVal)
        let g = Math.floor(vals[1] * 255 / maxVal)
        let b = Math.floor(vals[2] * 255 / maxVal)

        let tr = (color >> 16) & 0xFF
        let tg = (color >> 8) & 0xFF
        let tb = color & 0xFF

        // Euclidean color distance
        let dr = r - tr
        let dg = g - tg
        let db = b - tb
        let dist = Math.sqrt(dr * dr + dg * dg + db * db)
        return dist < Math.min(Math.max(tolerance, 10), 200);
    }

    /**
     * Returns true if detected color matches the selected color. Has a tolerance of 120.
     * @param color color to compare (as hex), eg: #00ff00
     */
    //% block="is reading color $color"
    //% color.shadow="colorNumberPicker"
    //% group="Color Sensor" weight=81
    export function isReadingColor(color: number): boolean {
        return isReadingColorWithTolerance(color, 120);
    }

    /**
     * Get the value of a color channel. The values are 16-bit integers, so the maximum value is 65535.
     */
    //% block="get $channel value"
    //% group="Color Sensor" weight=20
    //% advanced=true
    export function getChannelValue(channel: tcs3472RGBChannel): number {
        enableSensor()
        switch(channel) {
            case tcs3472RGBChannel.Red: return read16(0x16)
            case tcs3472RGBChannel.Green: return read16(0x18)
            case tcs3472RGBChannel.Blue: return read16(0x1A)
            default: return 0
        }
    }

    //% block="set color led $state"
    //% group="Color Sensor" weight=50
    //% advanced=true
    export function colorLed(state: ledState) {
        pins.digitalWritePin(DigitalPin.P9, state);
    }
}