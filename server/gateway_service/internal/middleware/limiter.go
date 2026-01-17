package middleware

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
)

func (m *Middleware) AuthLimiter(limit int) fiber.Handler {
	return limiter.New(limiter.Config{
		Max:               maxLimit(limit),
		Expiration:        time.Minute,
		LimiterMiddleware: limiter.SlidingWindow{},
		KeyGenerator:      keyGenerator,
		Next:              next,
		LimitReached:      limitReached,
	})
}

func maxLimit(limit int) int {
	max := 30
	if limit <= 0 {
		max = 100
	}

	return max
}

func keyGenerator(c *fiber.Ctx) string {
	return c.IP() + ":" + c.Path()
}

func next(c *fiber.Ctx) bool {
	return c.Path() == "/health" ||
		c.IP() == "127.0.0.1"
}

func limitReached(c *fiber.Ctx) error {
	return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
		"error": fiber.ErrTooManyRequests.Message,
	})
}
