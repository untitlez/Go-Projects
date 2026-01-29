package handler

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

type handler struct {
	sv domain.UserService
}

func NewHandler(sv domain.UserService) *handler {
	return &handler{sv: sv}
}

// Response Func
func (h *handler) responseSuccess(c *fiber.Ctx, status int, message string, data interface{}) error {
	rawJson, err := json.Marshal(data)
	if err != nil {
		return h.responseError(c, 404, err)
	}

	return c.Status(status).JSON(&domain.HandlerResponse{
		Success: true,
		Message: message,
		Data:    rawJson,
	})
}

func (h *handler) responseError(c *fiber.Ctx, status int, err error) error {
	return c.Status(status).JSON(&domain.HandlerResponse{
		Success: false,
		Error:   err.Error(),
	})
}
