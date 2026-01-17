package middleware

import (
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func (m *Middleware) AuthCORS() {
	m.app.Use(cors.New(cors.Config{
		AllowOrigins:     m.cfg.App.Domain,
		AllowCredentials: true,
		AllowHeaders:     "Origin, Content-Type, Authorization",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
	}))
}
