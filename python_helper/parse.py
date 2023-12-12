import json
import os
import cv2
from ultralytics import YOLO
from watchdog.observers import Observer
import time
from watchdog.events import FileSystemEventHandler


def get_color(number):
    color_dict = {
        0: (255, 0, 0),    # Red
        1: (0, 0, 255),    # Blue
        2: (0, 255, 0),    # Green
        3: (255, 255, 0),  # Yellow
        4: (255, 165, 0),  # Orange
        5: (128, 0, 128),  # Purple
        6: (255, 192, 203),  # Pink
        7: (0, 255, 255),  # Cyan
        8: (165, 42, 42)   # Brown
    }

    return color_dict.get(number, (0, 0, 0))  # 默认返回黑色


# 定义图片目录和JSON保存目录
image_dir = "./predict/image"
image_process_dir_127 = "./predict/image_process_127"
image_process_dir_192 = "./predict/image_process_192"
image_result_dir = "./predict/image_result"
json_dir = "./predict/json"

# 创建JSON保存目录
if not os.path.exists(json_dir):
    os.makedirs(json_dir)

if not os.path.exists(image_dir):
    os.makedirs(image_dir)

if not os.path.exists(image_process_dir_127):
    os.makedirs(image_process_dir_127)

if not os.path.exists(image_process_dir_192):
    os.makedirs(image_process_dir_192)

if not os.path.exists(image_result_dir):
    os.makedirs(image_result_dir)

model = YOLO('./best.pt')

# 定义处理文件系统事件的自定义处理程序

class ImageHandler(FileSystemEventHandler):
    def on_created(self, event): 
        try:
            if not event.is_directory and event.src_path.lower().endswith((".jpg", ".png", ".jpeg")):
                image_path = event.src_path
                json_file = f"{os.path.splitext(os.path.basename(image_path))[0]}.json"
                json_path = os.path.join(json_dir, json_file)
            else :
                return

            resultsJson = []
            print("开始预测")
            results = model.predict(
                event.src_path, save=False, imgsz=2048, conf=0.5, iou=0.2)
            print("预测完成")

            result = results[0]
            image_result = cv2.imread(event.src_path)
            # 读取检测Box
            for i in range(len(result)):
                x1, y1, x2, y2 = result[i].boxes.xyxy[0, 0].item(), result[i].boxes.xyxy[0, 1].item(
                ), result[i].boxes.xyxy[0, 2].item(), result[i].boxes.xyxy[0, 3].item()
                resultsJson.append({"class": result[i].names[int(
                    result[i].boxes.cls[0])], "x1": x1, "y1": y1, "x2": x2, "y2": y2})
                cv2.rectangle(image_result, (int(x1), int(y1)), (int(
                    x2), int(y2)), get_color(int(result[i].boxes.cls[0])), 2)

            cv2.imwrite(os.path.join(image_result_dir,os.path.basename(image_path)), image_result)
            
            img = cv2.imread(event.src_path)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            ret, mask_all_192 = cv2.threshold(gray, 192, 255, cv2.THRESH_BINARY)
            cv2.imwrite(os.path.join(image_process_dir_192,os.path.basename(image_path)), mask_all_192)
            
            ret, mask_all_127 = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY)
            cv2.imwrite(os.path.join(image_process_dir_127,os.path.basename(image_path)), mask_all_127)
            # 将检测结果保存为JSON文件
            with open(json_path, "w") as json_file:
                json.dump(resultsJson, json_file)
        except Exception as e:
            # 处理异常
            print("发生异常:", e)
        else:
            print("没有发生异常，完成了一次预测")

def main():
    event_handler = ImageHandler()
    observer = Observer()
    observer.schedule(event_handler, image_dir, recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()


if __name__ == "__main__":
    main()