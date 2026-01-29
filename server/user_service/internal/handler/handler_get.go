package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

// Get All
func (h *handler) GetAllUser(c *fiber.Ctx) error {
	req := &domain.UserRequest{}
	if err := c.QueryParser(&req.Query); err != nil {
		return h.responseError(c, 400, err)
	}

	res, err := h.sv.GetAllUser(req)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 200, "", res)
}

// Get ID
func (h *handler) GetUser(c *fiber.Ctx) error {
	req := &domain.UserRequest{}
	if err := c.ParamsParser(&req.Params); err != nil {
		return err
	}

	res, err := h.sv.GetUser(req)
	if err != nil {
		return h.responseError(c, 404, err)
	}

	return h.responseSuccess(c, 200, "", res)
}
