package utils

import "os"

const RdRag = "rd"
const ProdRag = "prod"

func GetEnvTag() string {
	if os.Getenv("Env") == RdRag {
		return RdRag
	} else if os.Getenv("Env") == ProdRag {
		return ProdRag
	}
	return RdRag
}
