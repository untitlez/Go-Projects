package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/untitlez/E-Commerce/server/gateway_service/config"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/handler"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/middleware"
)

func main() {
	cfg := config.InitConfig()

	app := fiber.New()
	app.Use(requestid.New())
	app.Use(compress.New())
	app.Use(logger.New())

	middleware.AuthCORS(app, cfg.App.Domain)
	checkAuth := middleware.AuthMiddleware(cfg.App.Secret)

	gatewayClient := client.NewClient(cfg)
	gatewayHandler := handler.NewHandler(gatewayClient, cfg.App.Development)

	public := app.Group("/")
	public.Post("/signup", gatewayHandler.SignUp)
	public.Post("/signin", gatewayHandler.SignIn)
	public.Post("/signout", gatewayHandler.SignOut)
	public.Get("/users", gatewayHandler.GetAllUser)
	public.Get("/images", gatewayHandler.GetImage)

	private := app.Group("/", checkAuth)
	private.Get("/session", gatewayHandler.Session)

	internal := app.Group("/api", checkAuth)
	internal.Use("/user", middleware.AuthProxy(cfg.Service.User, cfg.App.Domain))
	internal.Use("/profile", middleware.AuthProxy(cfg.Service.Profile, cfg.App.Domain))

	app.Listen(fmt.Sprintf(":%v", cfg.App.Port))
}
