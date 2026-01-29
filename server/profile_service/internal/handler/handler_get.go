package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

// Get All
func (h *handler) GetAllProfile(c *fiber.Ctx) error {
	req := &domain.ProfileRequest{}
	if err := c.QueryParser(&req.Query); err != nil {
		return h.responseError(c, 404, err)
	}

	res, err := h.sv.GetAllProfile(req)
	if err != nil {
		return h.responseError(c, 404, err)
	}

	return h.responseSuccess(c, 200, "", res)
}

// Get ID
func (h *handler) GetProfile(c *fiber.Ctx) error {
	req := &domain.ProfileRequest{}
	if err := c.ParamsParser(&req.Params); err != nil {
		return h.responseError(c, 400, err)
	}

	res, err := h.sv.GetProfile(req)
	if err != nil {
		return h.responseError(c, 404, err)
	}

	return h.responseSuccess(c, 200, "", res)
}
