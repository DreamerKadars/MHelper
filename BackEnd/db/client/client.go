package client

import (
	"MHelper/utils"
	"context"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/yaml.v2"
)

type DBConf struct {
	ConnectConf DBConnectConf `yaml:"connect_conf"`
}
type DBConnectConf struct {
	Url string `yaml:"url"`
}

var dbConf DBConf

var client *mongo.Client

func CheckDBConf() {
	if dbConf.ConnectConf.Url == "" {
		panic("dbConf.ConnectConf.Url is null!")
	}
}

func readDBConf() {
	data, err := os.ReadFile(fmt.Sprintf(utils.Setting.ConfDir+"db_%s_conf.yml", utils.GetEnvTag()))
	if err != nil {
		panic("load conf file fail!" + err.Error())
	}
	err = yaml.Unmarshal(data, &dbConf)
	if err != nil {
		panic("yaml unmarshal fail!")
	}
	CheckDBConf()
	utils.Info("load dbConf success! content is %+v\n", dbConf)
}

func InitDBConnect() {
	readDBConf()

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(dbConf.ConnectConf.Url).SetServerAPIOptions(serverAPI)

	// Create a new client and connect to the server
	var err error
	client, err = mongo.Connect(context.TODO(), opts)

	if err != nil {
		panic(err)
	}
	defer func() {
		// if err = client.Disconnect(context.TODO()); err != nil {
		// 	panic(err)
		// }
	}()

	// Send a ping to confirm a successful connection
	var result bson.M
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Decode(&result); err != nil {
		panic(err)
	}
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
}
