package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce/server/gateway_service/config"
)

type Middleware struct {
	app *fiber.App
	cfg *config.Config
}

func NewMiddleware(app *fiber.App, cfg *config.Config) *Middleware {
	return &Middleware{
		app: app,
		cfg: cfg,
	}
}
