package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/joho/godotenv"
	"github.com/untitlez/E-Commerce/server/gateway_service/config"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/handler"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/middleware"
)

func main() {
	godotenv.Load()
	cfg := config.InitConfig()

	app := fiber.New()
	app.Use(requestid.New())
	app.Use(compress.New())
	app.Use(logger.New())

	gatewayAuth := middleware.NewMiddleware(app, cfg)
	gatewayAuth.AuthCORS()
	gatewayAuth.AuthLimiter(100)

	gatewayClient := client.NewClient(cfg)
	gatewayHandler := handler.NewHandler(gatewayClient, cfg)

	public := app.Group("/")
	public.Post("/signup", gatewayHandler.SignUp)
	public.Post("/signin", gatewayAuth.AuthLimiter(5), gatewayHandler.SignIn)
	public.Post("/signout", gatewayHandler.SignOut)
	public.Get("/signin/google", gatewayHandler.ProviderGoogle)
	public.Get("/signin/google/callback", gatewayHandler.ProviderGoogleCallback)
	public.Post("/signin/google/verify", gatewayHandler.ProviderGoogleVerify)

	public.Get("/users", gatewayHandler.GetAllUser)
	public.Get("/images", gatewayHandler.GetImage)

	private := app.Group("/", gatewayAuth.AuthCookie())
	private.Get("/session", gatewayHandler.Session)

	internal := app.Group("/api", gatewayAuth.AuthCookie())
	internal.Use("/user", gatewayAuth.AuthProxy(cfg.Service.User))
	internal.Use("/profile", gatewayAuth.AuthProxy(cfg.Service.Profile))

	app.Listen(fmt.Sprintf(":%v", cfg.App.Port))
}
