package service

import (
	"github.com/untitlez/E-Commerce.git/internal/client"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

type service struct {
	repo   domain.ProfileRepository
	client *client.Client
}

func NewService(repo domain.ProfileRepository, client *client.Client) *service {
	return &service{
		repo:   repo,
		client: client,
	}
}
