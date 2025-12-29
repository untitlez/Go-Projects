package middleware

import (
	"github.com/gofiber/fiber/v2"
)

func AuthCORS(app *fiber.App, domain string) {
	// app.Use(cors.New(cors.Config{
	// 	AllowOrigins:     domain,
	// 	AllowCredentials: true,
	// 	AllowHeaders:     "Origin, Content-Type, Authorization, Cookie",
	// 	AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
	// }))
}
