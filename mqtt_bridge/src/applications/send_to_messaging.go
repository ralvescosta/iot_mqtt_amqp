package applications

import (
	"fmt"
	"os"

	frameworks "bridge/src/frameworks"
)

// SendToMessagingService ...
type SendToMessagingService struct {
	messaging *frameworks.Messaging
}

// Usecase ...
func (s *SendToMessagingService) Usecase(topic string, payload []byte) error {
	fmt.Println(topic, string(payload))
	fmt.Println()

	return s.messaging.Pub("", os.Getenv("AMQP_QUEUE"), false, false, payload)
}

// NewSendToMessagingService ...
func NewSendToMessagingService(messaging *frameworks.Messaging) *SendToMessagingService {
	return &SendToMessagingService{messaging: messaging}
}
