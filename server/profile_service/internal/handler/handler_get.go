package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

// Get All
func (h *handler) GetAllProfile(c *fiber.Ctx) error {
	query := &domain.ProfileQuery{}
	if err := c.QueryParser(query); err != nil {
		return h.responseError(c, 404, err)
	}

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
