package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce/server/gateway_service/config"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

type handler struct {
	client      *client.Client
	development string
	secret      string
	domain      string
}

func NewHandler(client *client.Client, cfg *config.Config) *handler {
	return &handler{
		client:      client,
		development: cfg.App.Development,
		secret:      cfg.App.Secret,
		domain:      cfg.App.Domain,
	}
}

// Response Func
func (h *handler) responseSuccess(c *fiber.Ctx, status int, message string, data interface{}) error {
	return c.Status(status).JSON(&domain.GatewayResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

func (h *handler) responseError(c *fiber.Ctx, status int, err error) error {
	return c.Status(status).JSON(&domain.GatewayResponse{
		Success: false,
		Error:   err.Error(),
	})
}
