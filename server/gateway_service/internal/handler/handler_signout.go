package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

func (h *handler) SignOut(c *fiber.Ctx) error {
	req := &domain.GatewayRequest{}
	if err := c.BodyParser(req); err != nil {
		return h.responseError(c, 400, err)
	}

	if req.Provider != "GOOGLE" {
		return h.responseSuccess(c, 200, "Sign Out Success", nil)
	}

	body := &domain.UserRequest{ID: req.ID}
	res, err := h.client.User.DeleteUser(body)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	if !res.Success {
		return h.responseError(c, 400, errors.New(res.Error))
	}

	return h.responseSuccess(c, 200, "Sign Out Success", nil)
}

// c.Cookie(&fiber.Cookie{
// 	Name:     "Authorization",
// 	Value:    "",
// 	Expires:  time.Now().Add(-time.Hour),
// 	MaxAge:   -1,
// 	Secure:   h.development == "production",
// 	HTTPOnly: true,
// 	SameSite: fiber.CookieSameSiteNoneMode,
// })
