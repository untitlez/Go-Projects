package main

import (
	"fmt"

	"github.com/joho/godotenv"
	"github.com/untitlez/E-Commerce.git/internal/client"
	"github.com/untitlez/E-Commerce.git/internal/handler"
	"github.com/untitlez/E-Commerce.git/internal/repository"
	"github.com/untitlez/E-Commerce.git/internal/service"

	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce.git/config"
)

func main() {
	godotenv.Load()
	cfg := config.InitConfig()
	db := config.InitDB(cfg)
	app := fiber.New()

	profilesRepository := repository.NewRepository(db)
	profileClient := client.NewClient(cfg)

	profilesService := service.NewService(profilesRepository, profileClient)
	profilesHandler := handler.NewHandler(profilesService)

	internal := app.Group("/api/profile")
	internal.Get("/:id<string>", profilesHandler.GetProfile)
	internal.Get("/", profilesHandler.GetAllProfile)
	internal.Post("/upload", profilesHandler.UploadImage)
	internal.Post("/", profilesHandler.CreateProfile)
	internal.Put("/:id<string>", profilesHandler.UpdateProfile)
	internal.Delete("/:id<string>", profilesHandler.DeleteProfile)

	app.Listen(fmt.Sprintf(":%v", cfg.App.Port))
}
