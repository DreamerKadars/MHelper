package utils

import (
	"log"
	"os"
	"path"
	"runtime"
	"strconv"
)

var Log *log.Logger

func init() {
	Log = log.New(os.Stdout, "INFO:", log.LstdFlags)
}

func Info(format string, a ...any) {
	_, file, line, ok := runtime.Caller(1)
	if !ok {
		file = "???"
		line = 0
	}
	_, fileName := path.Split(file)
	Log.Printf(fileName+":"+strconv.Itoa(line)+":"+format+"\n", a...)
}

func Error(format string, a ...any) {
	_, file, line, ok := runtime.Caller(1)
	if !ok {
		file = "???"
		line = 0
	}
	_, fileName := path.Split(file)
	Log.Printf(fileName+":"+strconv.Itoa(line)+":"+format+"\n", a...)
}
