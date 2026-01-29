package domain

import (
	"encoding/json"

	"github.com/google/uuid"
)

type ProfileRequest struct {
	ID        uuid.UUID `json:"id"`
	UserId    uuid.UUID `json:"user_id"`
	FullName  string    `json:"full_name"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Gender    string    `json:"gender"`
	BirthDate string    `json:"birth_date"`
	Email     string    `json:"email"`
	Address   string    `json:"address"`
	Phone     string    `json:"phone"`
	Image     string    `json:"image"`
}

type ProfileResponse struct {
	Success bool            `json:"success"`
	Message string          `json:"message,omitempty"`
	Error   string          `json:"error,omitempty"`
	Data    json.RawMessage `json:"data,omitempty"`
}

type ProfileClient interface {
	GetProfile(*ProfileRequest) (*ProfileResponse, error)
	UpdateProfile(*ProfileRequest) (*ProfileResponse, error)
}
