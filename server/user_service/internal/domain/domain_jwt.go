package domain

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type JWTClaims struct {
	jwt.RegisteredClaims `json:"registeredClaims"`
	ID                   uuid.UUID `json:"id,omitempty"`
	Username             string    `json:"username,omitempty"`
	Email                string    `json:"email,omitempty"`
	Role                 string    `json:"role,omitempty"`
	Image                string    `json:"image,omitempty"`
}
