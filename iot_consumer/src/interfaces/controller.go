package interfaces

import (
	frameworks "consumer/src/frameworks"
	"fmt"
)

type controller struct{}

// Handle ...
func (*controller) Handle(data []byte) bool {
	fmt.Println(string(data))
	return true
}

// NewController ...
func NewController() frameworks.IController {
	return &controller{}
}
