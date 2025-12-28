package handler

import (
	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/gofiber/fiber/v2"
)

type handler struct {
	sv domain.ProfileService
}

func NewHandler(s domain.ProfileService) *handler {
	return &handler{sv: s}
}

// Response Func
func (h *handler) responseSuccess(c *fiber.Ctx, status int, message string, data interface{}) error {
	return c.Status(status).JSON(&domain.HandlerResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

func (h *handler) responseError(c *fiber.Ctx, status int, err error) error {
	return c.Status(status).JSON(&domain.HandlerResponse{
		Success: false,
		Error:   err.Error(),
	})
}
