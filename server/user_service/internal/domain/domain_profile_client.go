package domain

import (
	"encoding/json"

	"github.com/google/uuid"
)

type ProfileClientRequest struct {
	ID uuid.UUID `json:"id"`
}

type ProfileClientResponse struct {
	Success bool            `json:"success"`
	Message string          `json:"message,omitempty"`
	Error   string          `json:"error,omitempty"`
	Data    json.RawMessage `json:"data,omitempty"`
}

type ProfileClient interface {
	CreateProfile(*ProfileClientRequest) (*ProfileClientResponse, error)
	DeleteProfile(*ProfileClientRequest) (*ProfileClientResponse, error)
}
