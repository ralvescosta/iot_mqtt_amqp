export function mqttSubscribeOnSpecificTopics ({ mqttConnection }: any) {
  mqttConnection.subscribe('#')
}
