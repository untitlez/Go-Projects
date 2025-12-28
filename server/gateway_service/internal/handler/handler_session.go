package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"
)

func (h *handler) Session(c *fiber.Ctx) error {
	session := c.Locals("session")
	if session == nil {
		return h.responseError(c, 401, errors.New("Unauthorized"))
	}

	return h.responseSuccess(c, 200, "", session)
}
