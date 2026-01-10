package handler

import (
	"github.com/gofiber/fiber/v2"
)

// Delete Profile
func (h *handler) DeleteProfile(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := h.sv.DeleteProfile(id); err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 202, "Delete Success", nil)
}
