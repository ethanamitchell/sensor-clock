import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
}

import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";
import { BodyPresenceSensor } from "body-presence";
import document from "document";
import { Gyroscope } from "gyroscope";
import { HeartRateSensor } from "heart-rate";
import { OrientationSensor } from "orientation";

const accel = new Accelerometer();
const bar = new Barometer();
const bps = new BodyPresenceSensor();
const gyro = new Gyroscope();
const hrm = new HeartRateSensor();
const orientation = new OrientationSensor();

accel.start();
bar.start();
bps.start();
gyro.start();
hrm.start();
orientation.start();

const accelData = document.getElementById("accel-data");
const barData = document.getElementById("bar-data");
const bpsData = document.getElementById("bps-data");
const gyroData = document.getElementById("gyro-data");
const hrmData = document.getElementById("hrm-data");
const orientationData = document.getElementById("orientation-data");

function refreshData() {
  const data = {
    accel: {
      x: accel.x ? accel.x.toFixed(1) : 0,
      y: accel.y ? accel.y.toFixed(1) : 0,
      z: accel.z ? accel.z.toFixed(1) : 0
    },
    bar: {
      pressure: bar.pressure ? parseInt(bar.pressure) : 0
    },
    bps: {
      presence: bps.present
    },
    gyro: {
      x: gyro.x ? gyro.x.toFixed(1) : 0,
      y: gyro.y ? gyro.y.toFixed(1) : 0,
      z: gyro.z ? gyro.z.toFixed(1) : 0,
    },
    hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    },
    orientation: orientation.quaternion ? orientation.quaternion.map(n => n.toFixed(1)) : null,
  }

  accelData.text = JSON.stringify(data.accel);
  barData.text = JSON.stringify(data.bar);
  bpsData.text = JSON.stringify(data.bps);
  gyroData.text = JSON.stringify(data.gyro);
  hrmData.text = JSON.stringify(data.hrm);
  orientationData.text = JSON.stringify(data.orientation);
}

refreshData();
setInterval(refreshData, 1000);

