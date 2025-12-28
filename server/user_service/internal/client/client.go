package client

import (
	"github.com/untitlez/E-Commerce.git/config"
	"github.com/untitlez/E-Commerce.git/internal/client/profile"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

type Client struct {
	Profile domain.ProfileClient
}

func NewClient(cfg *config.Config) *Client {
	return &Client{
		Profile: profile.NewProfileClient(cfg.Service.Profile),
	}

}
