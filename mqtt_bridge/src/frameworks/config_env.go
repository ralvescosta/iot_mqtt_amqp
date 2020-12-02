package frameworks

import (
	"io/ioutil"
	"os"
	"strings"
)

// ENV_PATH ...
const ENV_PATH = "./.env.development"

// RegisterEnvFile ...
func RegisterEnvFile() error {
	data, err := ioutil.ReadFile(ENV_PATH)
	if err != nil {
		return err
	}
	envSlice := strings.Split(string(data), "\n")

	var pairKeyValue []string

	for _, value := range envSlice {
		if value != "" {
			pairKeyValue = strings.Split(value, "=")
			err = os.Setenv(pairKeyValue[0], pairKeyValue[1])
			if err != nil {
				return err
			}
		}
	}

	return nil
}
