package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

// Delete Profile
func (h *handler) DeleteProfile(c *fiber.Ctx) error {
	req := &domain.ProfileRequest{}
	if err := c.ParamsParser(&req.Params); err != nil {
		return h.responseError(c, 400, err)
	}

	if err := h.sv.DeleteProfile(req); err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 202, "Delete Success", nil)
}
