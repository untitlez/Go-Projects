package domain

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type JWTClaims struct {
	jwt.RegisteredClaims `json:"registeredClaims"`
	ID                   uuid.UUID `json:"id"`
	Username             string    `json:"username"`
	Email                string    `json:"email"`
	Role                 string    `json:"role"`
	Image                string    `json:"image"`
}
