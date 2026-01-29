package config

import (
	"log"
	"strings"

	"github.com/spf13/viper"
)

type Config struct {
	App struct {
		Port        int
		Domain      string
		Development string
		Secret      string
	}

	DB struct {
		Database string
	}

	Service struct {
		User     string
		Profile  string
		Unsplash string
		Google   struct {
			Id       string
			Secret   string
			Redirect string
		}
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
		return nil
	}

	cfg := &Config{}
	if err := viper.Unmarshal(cfg); err != nil {
		log.Fatal(err.Error())
	}

	return cfg
}
