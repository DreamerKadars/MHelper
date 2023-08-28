package client

import "go.mongodb.org/mongo-driver/mongo"

func GetCollection(CollectionName string) *mongo.Collection {
	return client.Database(DefaultDateBaseName).Collection(CollectionName)
}

func GetClient() *mongo.Client {
	return client
}
