package domain

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type GatewayRequest struct {
	Username string `json:"username,omitempty"`
	Password string `json:"password,omitempty"`
}

type GatewayResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Error   string      `json:"error,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type JWTClaims struct {
	jwt.RegisteredClaims `json:"registeredClaims"`
	ID                   uuid.UUID `json:"id,omitempty"`
	Username             string    `json:"username,omitempty"`
	Email                string    `json:"email,omitempty"`
	Role                 string    `json:"role,omitempty"`
	Image                string    `json:"image,omitempty"`
}
