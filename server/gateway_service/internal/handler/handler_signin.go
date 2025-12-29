package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

func (h *handler) SignIn(c *fiber.Ctx) error {
	body := &domain.GatewayRequest{}
	if errBodyParser := c.BodyParser(body); errBodyParser != nil {
		return errBodyParser
	}

	res, err := h.client.User.Signin(body)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	if !res.Success {
		return h.responseError(c, 400, errors.New(res.Error))
	}

	// c.Cookie(&fiber.Cookie{
	// 	Name:     "Authorization",
	// 	Value:    res.Data.(string),
	// 	Expires:  time.Now().Add(time.Hour),
	// 	Secure:   h.development == "production",
	// 	HTTPOnly: true,
	// 	SameSite: fiber.CookieSameSiteNoneMode,
	// })

	return h.responseSuccess(c, 200, "Sign In Success", res.Data)
}
