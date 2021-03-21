This repository compiles codes, libraries and content for automation in reading hydrometeorological data.

## Actual code

- [HTTP POST To Ubidots via GPRS with TinyGSM](https://github.com/dirceup/remote_hydrometeorological_monitoring_system/blob/master/arduino/gprs_to_ubidots.ino)
- [How To](https://github.com/dirceup/remote_hydrometeorological_monitoring_system/blob/master/howto.md)

## Libraries used

- [TinyGSM](https://github.com/vshymanskyy/TinyGSM)
- [ArduinoHttpClient](https://github.com/arduino-libraries/ArduinoHttpClient)

## Current hardware

- [DOIT ESP32 DEVKIT V1](https://en.wikipedia.org/wiki/ESP32)
- SIMCom GSM900 based Arduino Shield

## Pinout

- [DOIT ESP32 DEVKIT V1](https://github.com/dirceup/remote_hydrometeorological_monitoring_system/blob/master/pinout/ESP32-DOIT-DEVKIT-V1-Board-Pinout-30-GPIOs-Copy.png)
- [SIMCom GSM900](https://github.com/dirceup/remote_hydrometeorological_monitoring_system/blob/master/pinout/Wiring-SIM900-GSM-GPRS-Shield-with-Arduino-UNO.png)

## Other hardware options

- [Raspberry Pi Pico](https://www.raspberrypi.org/products/raspberry-pi-pico/)
- [ESP8266](https://en.wikipedia.org/wiki/ESP8266)

[Arduino Uno](http://arduino.cc/) was unable to handle TinyGSM + ArduinoHttpClient libraries in memory

## SaaS options

- [Ubidots](https://ubidots.com/) (free for Educational or Personal purposes, cloud functions not included in free plan);
- [Thingspeak](https://thingspeak.com/)
- [Adafruit IO](https://io.adafruit.com/)
- [Thinger.io](https://thinger.io/)
- [Thingsboard](https://thingsboard.io/)
- ...

## Dashboard Prototype

- [Dashboard Prototype](https://dirceup.github.io/remote_hydrometeorological_monitoring_system/dashboard/)
