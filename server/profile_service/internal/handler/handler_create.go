package handler

import (
	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/gofiber/fiber/v2"
)

func (h *handler) CreateProfile(c *fiber.Ctx) error {
	req := &domain.ProfileRequest{}
	if err := c.BodyParser(req); err != nil {
		return err
	}

	if err := h.sv.CreateProfile(req); err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 201, "Create Success", nil)
}
