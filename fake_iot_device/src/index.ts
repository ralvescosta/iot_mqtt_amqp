import { connect } from 'mqtt'

const mqttTransport = 'tcp';
const mqttHost = '127.0.0.1';
const mqttPort = 1883;
const mqttClientId = `randomId${Math.floor(Math.random() * 999999999)}`;


const mqttConnection = connect(`${mqttTransport}://${mqttHost}:${mqttPort}`,{clientId: mqttClientId});

setInterval(()=> {
  const fakeData = {
    temp: Math.floor(Math.random() * 50)
  }
  mqttConnection.publish(`temperature/${Math.floor(Math.random() * 9999)}`, Buffer.from(JSON.stringify(fakeData)), {qos: 2})
}, 1000)
    