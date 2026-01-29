package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/untitlez/E-Commerce.git/config"
	"github.com/untitlez/E-Commerce.git/internal/client"
	"github.com/untitlez/E-Commerce.git/internal/handler"
	"github.com/untitlez/E-Commerce.git/internal/repository"
	"github.com/untitlez/E-Commerce.git/internal/service"
)

func main() {
	godotenv.Load()
	cfg := config.InitConfig()
	db := config.InitDB(cfg)
	app := fiber.New()

	userRepository := repository.NewRepository(db)
	userClient := client.NewClient(cfg)

	userService := service.NewService(userRepository, userClient, cfg)
	userHandler := handler.NewHandler(userService)

	req := app.Group("/")
	req.Get("/users", userHandler.GetAllUser)
	req.Post("/signup", userHandler.SignUp)
	req.Post("/signin", userHandler.SignIn)

	internal := app.Group("/api/user")
	internal.Get("/:id", userHandler.GetUser)
	internal.Get("/", userHandler.GetAllUser)
	internal.Put("/:id", userHandler.UpdateUser)
	internal.Delete("/:id", userHandler.DeleteUser)

	app.Listen(fmt.Sprintf(":%v", cfg.App.Port))
}
