package google

import (
	"context"

	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
	"golang.org/x/oauth2"
	googleClient "golang.org/x/oauth2/google"
	idToken "google.golang.org/api/idtoken"
)

type google struct {
	secret string
	config *oauth2.Config
}

func NewGoogleClient(secret string, googleId string, googleISecret string, googleRedirectURL string) *google {
	return &google{
		secret: secret,
		config: &oauth2.Config{
			ClientID:     googleId,
			ClientSecret: googleISecret,
			RedirectURL:  googleRedirectURL,
			Endpoint:     googleClient.Endpoint,
			Scopes: []string{
				"openid",
				"email",
				"profile",
			},
		},
	}
}

func (c *google) GoogleAuth() string {
	url := c.config.AuthCodeURL("state")
	return url
}

func (c *google) GoogleCallBack(ctx context.Context, code string) (*domain.GoogleResponse, error) {
	oauth2Token, err := c.config.Exchange(ctx, code)
	if err != nil {
		return nil, err
	}

	tokenString := oauth2Token.Extra("id_token").(string)

	payload, err := idToken.Validate(ctx, tokenString, c.config.ClientID)
	if err != nil {
		return nil, err
	}

	response := &domain.GoogleResponse{
		Email:     payload.Claims["email"].(string),
		FullName:  payload.Claims["name"].(string),
		FirstName: payload.Claims["given_name"].(string),
		LastName:  payload.Claims["family_name"].(string),
		Image:     payload.Claims["picture"].(string),
		Role:      "GUEST",
	}

	return response, nil
}
