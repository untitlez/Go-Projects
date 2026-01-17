package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

func (m *Middleware) AuthCookie() fiber.Handler {
	return func(c *fiber.Ctx) error {
		var tokenString string
		auth := c.Get("Authorization")

		if strings.HasPrefix(auth, "Bearer ") {
			tokenString = strings.TrimPrefix(auth, "Bearer ")
		}

		if tokenString == "" {
			tokenString = c.Cookies("Authorization")
		}

		if tokenString == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"success": false,
				"error":   "Unauthorized",
			})
		}

		claims := &domain.JWTClaims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
			return []byte(m.cfg.App.Secret), nil
		})

		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"success": false,
				"error":   "invalid token",
			})
		}

		c.Locals("session", claims)

		return c.Next()
	}
}
