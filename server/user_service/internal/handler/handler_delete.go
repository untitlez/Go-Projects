package handler

import (
	"github.com/gofiber/fiber/v2"
)

func (h *handler) DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := h.sv.DeleteUser(id); err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 202, "Delete Success", nil)
}
