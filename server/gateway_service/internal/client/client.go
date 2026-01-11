package client

import (
	"github.com/untitlez/E-Commerce/server/gateway_service/config"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client/host"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client/unsplash"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client/user"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

type Client struct {
	Host     domain.Host
	User     domain.UserClient
	Unsplash domain.UnsplashClient
}

func NewClient(cfg *config.Config) *Client {
	return &Client{
		Host:     host.NewHostClient(cfg.App.Host),
		User:     user.NewUserClient(cfg.Service.User),
		Unsplash: unsplash.NewUnsplashClient(cfg.App.Unsplash),
	}

}
