package service

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/untitlez/E-Commerce.git/internal/domain"
	"golang.org/x/crypto/bcrypt"
)

func (s *service) SignIn(req *domain.UserRequest) (string, error) {
	filter := req.Username == "" && req.Password == ""
	if filter {
		return "", errors.New("please enter your username and password.")
	}

	body := &domain.UserRequest{
		Username: req.Username,
		Password: req.Password,
	}

	data, err := s.repo.FindByUsername(body)
	if err != nil {
		return "", err
	}

	if data == nil {
		return "", errors.New("username not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(data.Password), []byte(body.Password)); err != nil {
		return "", errors.New("incorrect password")
	}

	claims := &domain.JWTClaims{
		ID:       data.ID,
		Username: data.Username,
		Role:     data.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString([]byte(s.secretKey))
	if err != nil {
		return "", err
	}

	return signed, nil
}
