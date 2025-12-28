package client

import (
	"github.com/untitlez/E-Commerce/server/gateway_service/config"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client/user"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

type Client struct {
	User domain.UserClient
}

func NewClient(cfg *config.Config) *Client {
	return &Client{
		User: user.NewUserClient(cfg.Service.User),
	}

}
