package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

func (h *handler) GetAllUser(c *fiber.Ctx) error {
	req := &domain.UserRequest{}
	if err := c.QueryParser(req); err != nil {
		return h.responseError(c, 400, err)
	}

	res, err := h.client.User.GetAllUser(req)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	if !res.Success {
		return h.responseError(c, 400, errors.New(res.Error))
	}

	return h.responseSuccess(c, 200, "", res.Data)
}

func (h *handler) GetImage(c *fiber.Ctx) error {
	query := c.Query("query")
	res, err := h.client.Unsplash.GetImage(query)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 200, "", res.Url)
}
