package service

import (
	"MHelper/utils"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"time"
)

func DealOldFile() {
	folderPaths := []string{
		utils.ImagePath,
		utils.JsonPath,
		utils.ImageAfterProcess192Path,
		utils.ImageAfterProcess127Path,
	}

	for {
		for _, folderPath := range folderPaths {
			err := deleteOldFiles(folderPath)
			if err != nil {
				fmt.Println("Error deleting old files:", err)
			}
		}

		time.Sleep(10 * time.Minute)
	}
}

func deleteOldFiles(folderPath string) error {
	currentTime := time.Now()

	err := filepath.Walk(folderPath, func(filePath string, fileInfo os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// 检查文件名是否符合格式：timestamp_xxx
		if !fileInfo.IsDir() && isValidFileName(fileInfo.Name()) {
			// 解析时间戳部分
			timestampPart := fileInfo.Name()[:10] // 提取前10位作为时间戳部分
			timestamp, err := strconv.ParseInt(timestampPart, 10, 64)
			if err != nil {
				return err
			}

			// 计算文件的存在时间
			duration := currentTime.Sub(time.Unix(timestamp, 0))
			if duration.Minutes() >= 10 {
				err := os.Remove(filePath)
				if err != nil {
					return err
				}
				fmt.Println("Deleted file:", filePath)
			}
		}
		return nil
	})

	return err
}

func isValidFileName(fileName string) bool {
	// 简单判断是否符合格式：timestamp_xxx
	return len(fileName) >= 11 && fileName[10] == '_'
}
