package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"
)

func (h *handler) GetAllUser(c *fiber.Ctx) error {
	limit := c.Query("limit")
	res, err := h.client.User.GetAllUser(limit)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	if !res.Success {
		return h.responseError(c, 400, errors.New(res.Error))
	}

	return h.responseSuccess(c, 200, "", res.Data)
}
