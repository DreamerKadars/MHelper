package utils

func NewInt(num int) *int {
	p := new(int)
	*p = num
	return p
}

func NewString(str string) *string {
	p := new(string)
	*p = str
	return p
}

func NewFloat32(num float32) *float32 {
	p := new(float32)
	*p = num
	return p
}

func GetString(input *string) string {
	if input == nil {
		return ""
	}
	return *input
}

func GetInt(input *int) int {
	if input == nil {
		return 0
	}
	return *input
}
