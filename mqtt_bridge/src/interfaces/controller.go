package interfaces

import (
	applications "bridge/src/applications"
	frameworks "bridge/src/frameworks"
)

// Interface ...
type interfaces struct {
	usecase *applications.SendToMessagingService
}

// Handle ...
func (i *interfaces) Handle(topic string, payload []byte) error {
	return i.usecase.Usecase(topic, payload)
}

// NewMQTTSubscriber ...
func NewMQTTSubscriber(usecase *applications.SendToMessagingService) frameworks.IController {
	return &interfaces{usecase: usecase}
}
