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
}

func InitConfig() *Config {
	viper.AutomaticEnv()
	viper.AddConfigPath("/config/config.yml")
	viper.SetEnvKeyReplacer(strings.NewReplacer(",", "_"))

	if err := viper.ReadInConfig(); err != nil {
		log.Fatal(err.Error())
		return nil
	}

	cfg := &Config{}
	if err := viper.Unmarshal(cfg); err != nil {
		log.Fatal(err.Error())
	}

	return cfg
}
