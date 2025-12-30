package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/proxy"
)

func AuthProxy(addr string, domain string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		if err := proxy.Do(c, addr+c.OriginalURL()); err != nil {
			return err
		}

		c.Response().Header.Set(fiber.HeaderAccessControlAllowOrigin, domain)

		return nil
	}

}
