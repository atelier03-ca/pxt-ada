// Test forward/backward motion
input.onButtonPressed(Button.A, () => {
    basic.showString("FB");
    ada.forward(35, 0.5);
    ada.backwards(35, 0.5);
    basic.clearScreen();
});

// Test left/right motion
input.onButtonPressed(Button.B, () => {
    basic.showString("LR");
    ada.turnLeft(50, 0.5);
    ada.turnRight(50, 0.5);
    basic.clearScreen();
});

// Test distance
basic.forever(() => {
    let distance = ada.readDistance(ada.DistanceUnit.Cm);
    serial.writeNumber(distance);
    basic.pause(10);
})