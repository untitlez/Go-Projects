package domain

import (
	"context"
)

type GoogleRequest struct {
	Code string `json:"code"`
}

type GoogleResponse struct {
	Email     string `json:"email,omitempty"`
	FullName  string `json:"full_name,omitempty"`
	FirstName string `json:"first_name,omitempty"`
	LastName  string `json:"last_name,omitempty"`
	Image     string `json:"image,omitempty"`
	Provider  string `json:"provider,omitempty"`
}

type GoogleClient interface {
	GoogleAuth() string
	GoogleCallBack(context.Context, string) (*GoogleResponse, error)
}
