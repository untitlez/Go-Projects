package client

import (
	"github.com/untitlez/E-Commerce/server/gateway_service/config"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client/google"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client/profile"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client/unsplash"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/client/user"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

type Client struct {
	User     domain.UserClient
	Profile  domain.ProfileClient
	Unsplash domain.UnsplashClient
	Google   domain.GoogleClient
}

func NewClient(cfg *config.Config) *Client {
	return &Client{
		User:     user.NewUserClient(cfg.Service.User),
		Profile:  profile.NewProfileClient(cfg.Service.Profile),
		Unsplash: unsplash.NewUnsplashClient(cfg.Service.Unsplash),
		Google:   google.NewGoogleClient(cfg.App.Secret, cfg.Service.Google.Id, cfg.Service.Google.Secret, cfg.Service.Google.Redirect),
	}

}
