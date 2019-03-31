# pxt-hitechnic-irseeker-v2

A MakeCode editor extension for the HiTechnic IR Seeker V2 sensor.

## Wire Connections

The wire connections from the HiTechnic sensor are as follows:
white -> battery +9V (Vcc)
black -> Microbit GND
red -> battery – (GND)
green -> Microbit +3.3V (Vcc)
yellow -> Microbit SCL (Pin 19)
blue -> Microbit SDA (Pin 20)

## Usage

This package contains an ``initialise`` block to safely initialise the HiTechnic IRSeeker V2 sensor.  

Then you can use one of the following blocks to return the direction of the ball:
* ``get AC direction``
* ``get AC strength``
* ``get DC direction``
* ``get DC strength``

## Example 1: Get AC direction
```blocks
IRSeekerV2.initialise()
basic.forever(function () {
    basic.showNumber(IRSeekerV2.getACDirection())
})
```

## Example 2: Charting the signal strength
```blocks
IRSeekerV2.initialise()
basic.forever(function () {
    led.plotBarGraph(
    IRSeekerV2.getACStr(),
    200
    )
})

```

## License

MIT

## Supported targets

* for PXT/microbit
