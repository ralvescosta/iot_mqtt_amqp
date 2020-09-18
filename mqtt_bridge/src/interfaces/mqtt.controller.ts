export function mqttController ({ usecase }:any) {
  return function (topic: string, message: any) {
    let json: any
    try {
      json = JSON.parse(message.toString())
    } catch (err) {}

    const result = usecase({ topic, data: json })

    if (result) {
      console.log('SENDO TO AMQP')
    }
  }
}
