package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce.git/config"
	"github.com/untitlez/E-Commerce.git/internal/client"
	"github.com/untitlez/E-Commerce.git/internal/handler"
	"github.com/untitlez/E-Commerce.git/internal/repository"
	"github.com/untitlez/E-Commerce.git/internal/service"
)

func main() {
	cfg := config.InitConfig()
	db := config.InitDB(cfg)
	app := fiber.New()

	userRepository := repository.NewRepository(db)
	userClient := client.NewClient(cfg)

	userService := service.NewService(userRepository, userClient, cfg.App.Secret)
	userHandler := handler.NewHandler(userService)

	req := app.Group("/")
	req.Get("/users", userHandler.GetAllUser)
	req.Post("/signup", userHandler.SignUp)
	req.Post("/signin", userHandler.SignIn)

	internal := app.Group("/api/user")
	internal.Get("/:id<string>", userHandler.GetUser)
	internal.Get("/", userHandler.GetAllUser)
	internal.Put("/:id<string>", userHandler.UpdateUser)
	internal.Delete("/:id<string>", userHandler.DeleteUser)

	app.Listen(fmt.Sprintf(":%v", cfg.App.Port))
}
