package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

func (h *handler) SignUp(c *fiber.Ctx) error {
	body := &domain.UserRequest{}
	if errBodyParser := c.BodyParser(body); errBodyParser != nil {
		return errBodyParser
	}

	res, err := h.client.User.SignUp(body)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	if !res.Success {
		return h.responseError(c, 400, errors.New(res.Error))
	}

	return h.responseSuccess(c, 201, "Sign Up Success", nil)
}
