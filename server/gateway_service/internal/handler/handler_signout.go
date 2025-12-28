package handler

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

func (h *handler) SignOut(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     "Authorization",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		MaxAge:   -1,
		Secure:   h.development == "production",
		HTTPOnly: true,
		SameSite: fiber.CookieSameSiteNoneMode,
	})

	return h.responseSuccess(c, 200, "Sign Out Success", nil)
}
