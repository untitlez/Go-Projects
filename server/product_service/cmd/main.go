package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/untitlez/Go-Projects.git/config"
)

func main() {
	godotenv.Load()
	cfg := config.InitConfig()
	app := fiber.New()

	app.Listen(fmt.Sprintf(":%v", cfg.App.Port))
}
