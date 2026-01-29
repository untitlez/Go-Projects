package domain

import (
	"encoding/json"

	"github.com/google/uuid"
)

type UserRequest struct {
	ID               uuid.UUID `json:"id"`
	Username         string    `json:"username"`
	Password         string    `json:"password"`
	ResponsePassword string    `json:"response_password"`
	Role             string    `json:"role"`
	Limit            int       `json:"limit"`
	Offset           int       `json:"offset"`
	Search           string    `json:"search"`
}

type UserResponse struct {
	Success bool            `json:"success"`
	Message string          `json:"message,omitempty"`
	Error   string          `json:"error,omitempty"`
	Data    json.RawMessage `json:"data,omitempty"`
}

type UserClient interface {
	SignUp(*UserRequest) (*UserResponse, error)
	Signin(*UserRequest) (*UserResponse, error)
	GetAllUser(*UserRequest) (*UserResponse, error)
	DeleteUser(*UserRequest) (*UserResponse, error)
}
