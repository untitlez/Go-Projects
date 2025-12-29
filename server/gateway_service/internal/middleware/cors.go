package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func AuthCORS(app *fiber.App, domain string) {
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowCredentials: true,
		AllowHeaders:     "Origin, Content-Type, Authorization",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
	}))
}
