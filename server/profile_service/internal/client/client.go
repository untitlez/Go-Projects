package client

import (
	"github.com/untitlez/E-Commerce.git/config"
	"github.com/untitlez/E-Commerce.git/internal/client/cloudinary"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

type Client struct {
	Cloudinary domain.CloudinaryClient
}

func NewClient(cfg *config.Config) *Client {
	return &Client{
		Cloudinary: cloudinary.NewCloudinaryClient(cfg.Service.Cloudinary),
	}

}
