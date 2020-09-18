import { connect, MqttClient } from 'mqtt'

let mqttConnection: MqttClient

async function mqttConnectCallbackToPromise (): Promise<MqttClient> {
  // eslint-disable-next-line promise/param-names
  return new Promise((resolve, rejects) => {
    const mqttTransport = 'tcp'
    const mqttHost = '127.0.0.1'
    const mqttPort = 1883
    const mqttClientId = `randomId${Math.floor(Math.random() * 999999999)}`

    try {
      const mqttConnection = connect(
          `${mqttTransport}://${mqttHost}:${mqttPort}`,
          {
            clientId: mqttClientId
          }
      )
      resolve(mqttConnection)
    } catch (err) {
      rejects(err)
    }
  })
}

async function connectToMqtt () {
  const mqttCon = await mqttConnectCallbackToPromise()
  mqttConnection = mqttCon
}

function getMqttConnection (): MqttClient {
  if (!mqttConnection) {
    throw new Error('Mqtt connection do not established')
  }
  return mqttConnection
}

export { connectToMqtt, getMqttConnection }
