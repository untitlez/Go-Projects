package service

import (
	"github.com/untitlez/E-Commerce.git/config"
	"github.com/untitlez/E-Commerce.git/internal/client"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

type service struct {
	repo      domain.UserRepository
	client    *client.Client
	secretKey string
}

func NewService(repo domain.UserRepository, client *client.Client, cfg *config.Config) *service {
	return &service{
		repo:      repo,
		client:    client,
		secretKey: cfg.App.Secret,
	}
}
