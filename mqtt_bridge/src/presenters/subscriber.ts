export type MqttSubscribeOnSpecificTopicsParams = {
  mqttConnection: {
    subscribe: (s1: string) => void
  };
}

export function mqttSubscribeOnSpecificTopics ({ mqttConnection }: MqttSubscribeOnSpecificTopicsParams) {
  mqttConnection.subscribe('#')
}
