package config

import (
	"log"
	"strings"

	"github.com/spf13/viper"
)

type Config struct {
	App struct {
		Port int
	}

	DB struct {
		Database string
	}

	Service struct {
		Cloudinary string
	}
}

func InitConfig() *Config {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./config")

	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	if err := viper.ReadInConfig(); err != nil {
		log.Fatal(err.Error())
	}

	cfg := &Config{}
	if err := viper.Unmarshal(cfg); err != nil {
		log.Fatal(err.Error())
		return nil
	}

	return cfg
}
