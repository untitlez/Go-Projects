package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

func (h *handler) SignIn(c *fiber.Ctx) error {
	req := &domain.UserRequest{}
	if errBodyParser := c.BodyParser(req); errBodyParser != nil {
		return errBodyParser
	}

	res, err := h.sv.SignIn(req)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 200, "", res.SignedToken)
}

func (h *handler) SignUp(c *fiber.Ctx) error {
	req := &domain.UserRequest{}
	if errBodyParser := c.BodyParser(req); errBodyParser != nil {
		return errBodyParser
	}

	if err := h.sv.SignUp(req); err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 200, "", nil)
}
