package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

func (h *handler) UpdateUser(c *fiber.Ctx) error {
	req := &domain.UserRequest{}
	if errBodyParser := c.BodyParser(req); errBodyParser != nil {
		return errBodyParser
	}

	id := c.Params("id")
	if err := h.sv.UpdateUser(id, req); err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 200, "Update Success", nil)
}
