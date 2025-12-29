package main

import (
	"fmt"

	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/proxy"
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
	public.Get("/users", gatewayHandler.GetAllUser)
	public.Get("/images", gatewayHandler.GetImage)

	private := app.Group("/", checkAuth)
	private.Get("/session", gatewayHandler.Session)
	private.Post("/signout", gatewayHandler.SignOut)

	internal := app.Group("/api", checkAuth)
	internal.Use("/user", proxy.Balancer(proxy.Config{
		Servers: []string{cfg.Service.User + "/api/user"},
		ModifyResponse: func(c *fiber.Ctx) error {
			c.Response().Header.Set("Access-Control-Allow-Origin", cfg.App.Domain)
			c.Response().Header.Set("Access-Control-Allow-Credentials", "true")
			return nil
		},
		Timeout: 5 * time.Second,
	}))

	internal.Use("/profile", proxy.Balancer(proxy.Config{
		Servers: []string{cfg.Service.Profile + "/api/profile"},
		ModifyResponse: func(c *fiber.Ctx) error {
			c.Response().Header.Set("Access-Control-Allow-Origin", cfg.App.Domain)
			c.Response().Header.Set("Access-Control-Allow-Credentials", "true")
			return nil
		},
		Timeout: 5 * time.Second,
	}))

	app.Listen(fmt.Sprintf(":%v", cfg.App.Port))
}
