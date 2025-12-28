package handler

import (
	"github.com/gofiber/fiber/v2"
)

// Get All
func (h *handler) GetAllProfile(c *fiber.Ctx) error {
	query := c.Query("limit")
	res, err := h.sv.GetAllProfile(query)
	if err != nil {
		return h.responseError(c, 404, err)
	}

	return h.responseSuccess(c, 200, "", res)
}

// Get ID
func (h *handler) GetProfile(c *fiber.Ctx) error {
	id := c.Params("id")
	res, err := h.sv.GetProfile(id)
	if err != nil {
		return h.responseError(c, 404, err)
	}

	return h.responseSuccess(c, 200, "", res)
}
