class InfraredResult{
  direction:number;
  strength:number;
  constructor(direction:number, strength:number) {
     this.direction = direction;
     this.strength = strength;
  }
}

//% weight=70 icon="\uf185" color=#EC7505
namespace IRSeekerV2 {
  let address = 0x10 / 2; // Divide by two as 8bit-I2C is provided

  //% blockId=ir_initialise block="initialise"
  export function initialise(): void {
    let buf = pins.createBuffer(1);
    buf[0] = 0x00;
    pins.i2cWriteBuffer(address, buf, false);
  }

  function test(): string {
    let buf = pins.createBuffer(1);
    buf[0] = 0x08;
    pins.i2cWriteBuffer(address, buf, false);
    let readBuf = pins.i2cReadBuffer(address, 16, false);
    let s = String.fromCharCode(readBuf[0]);
    return s;
  }

  function readACRaw() {
    let sendBuf = pins.createBuffer(1);
    sendBuf[0] = 0x49; // offset address
    pins.i2cWriteBuffer(address, sendBuf, false);
    let readBuf = pins.i2cReadBuffer(address, 6, false);
    return readBuf;
  }

  function readDCRaw() {
      let sendBuf = pins.createBuffer(1);
      sendBuf[0] = 0x42; // offset address
      pins.i2cWriteBuffer(address, sendBuf, false);
      let readBuf = pins.i2cReadBuffer(address, 6, false);
      return readBuf;
  }

  function populateValues(readBuf: Buffer): InfraredResult {
    let direction = readBuf.getNumber(NumberFormat.Int8LE, 0);
    let half = Math.floor(direction / 2);
    let values = new InfraredResult(direction, 0);
    if (direction == 0) {
        return values; // 0, 0
    }
    else if (direction % 2 == 1) { // 1 > 1, 3 > 2, 5 > 3, 7 > 4, 9 > 5
        values.strength = readBuf[half + 1];
    } else {
        values.strength = (readBuf[half] + readBuf[half + 2] / 2);
    }
    return values;
  }

  //% blockId=ir_getACDir block="get AC direction"
  export function getACDirection(): number {
    let readBuf = readACRaw();
    let values = populateValues(readBuf);
    return values.direction;
  }

  //% blockId=ir_getACStr block="get AC strength"
  export function getACStrength(): number {
    let readBuf = readACRaw();
    let values = populateValues(readBuf);
    return values.strength;
  }

  //% blockId=ir_getDCDir block="get DC direction"
  export function getDCDirection(): number {
    let readBuf = readDCRaw();
    let values = populateValues(readBuf);
    return values.direction;
  }

  //% blockId=ir_getDCStr block="get DC strength"
  export function getDCStrength(): number {
    let readBuf = readDCRaw();
    let values = populateValues(readBuf);
    return values.strength;
  }

}
