/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
'use strict';

const shellyHelper = require('../shelly-helper');

/**
 * Shelly Flood / SHWT-1 / shellyflood
 * CoAP:
  *
 * CoAP Version >= 1.8
 *  Shelly Flood SHWT-1:    {"blk":[{"I":1,"D":"sensor_0"},{"I":2,"D":"device"}],"sen":[{"I":9103,"T":"EVC","D":"cfgChanged","R":"U16","L":2},{"I":3101,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":1},{"I":3102,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":1},{"I":6106,"T":"A","D":"flood","R":["0/1","-1"],"L":1},{"I":3115,"T":"S","D":"sensorError","R":"0/1","L":1},{"I":3111,"T":"B","D":"battery","R":["0/100","-1"],"L":2},{"I":9102,"T":"EV","D":"wakeupEvent","R":["battery/button/periodic/poweron/sensor/alarm","unknown"],"L":2}]}
 */
let shellyflood = {
  'sensor.battery': {
    coap: {
      coap_publish: '3111' // CoAP >= FW 1.8
    },
    mqtt: {
      mqtt_publish: 'shellies/shellyflood-<deviceid>/sensor/battery',
    },
    common: {
      'name': 'Battery capacity',
      'type': 'number',
      'role': 'value.battery',
      'read': true,
      'write': false,
      'min': 0,
      'max': 100,
      'unit': '%'
    }
  },
  'sensor.flood': {
    coap: {
      coap_publish: '6106', // CoAP >= FW 1.8
      coap_publish_funct: (value) => { return value === 1 ? true : false; }, 
    },
    mqtt: {
      mqtt_publish: 'shellies/shellyflood-<deviceid>/sensor/flood',
    },
    common: {
      'name': 'Flood',
      'type': 'boolean',
      'role': 'sensor.alarm.flood',
      'read': true,
      'write': false
    }
  },
  'sensor.temperature': {
    coap: {
      coap_publish: '3101' // CoAP >= FW 1.8
    },
    mqtt: {
      mqtt_publish: 'shellies/shellyflood-<deviceid>/sensor/temperature',
    },
    common: {
      'name': 'Temperature',
      'type': 'number',
      'role': 'value.temperature',
      'read': true,
      'write': false,
      'min': -100,
      'max': 100
    }
  }
};

module.exports = {
  shellyflood: shellyflood
};
