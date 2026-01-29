package handler

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

// URL func
func (h *handler) ProviderGoogle(c *fiber.Ctx) error {
	url := h.client.Google.GoogleAuth()
	return h.responseSuccess(c, 200, "", url)
}

// Callback Func
func (h *handler) ProviderGoogleCallback(c *fiber.Ctx) error {
	query := c.Query("code")
	googleRes, err := h.client.Google.GoogleCallBack(c.Context(), query)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	b, _ := json.Marshal(googleRes)
	encode := base64.RawURLEncoding.EncodeToString(b)

	redirectPath := fmt.Sprintf("%v/auth/signin/verify#callback=%v", h.domain, encode)
	return c.Redirect(redirectPath)
}

// Verify
func (h *handler) ProviderGoogleVerify(c *fiber.Ctx) error {
	req := &domain.GoogleRequest{}
	if err := c.BodyParser(req); err != nil {
		return h.responseError(c, 400, err)
	}

	decode, err := base64.RawURLEncoding.DecodeString(req.Code)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	googleRes := &domain.GoogleResponse{}
	if err := json.Unmarshal(decode, googleRes); err != nil {
		return h.responseError(c, 400, err)
	}

	body := &domain.UserRequest{
		Username: googleRes.Email,
		Password: googleRes.Email,
		Role:     googleRes.Role,
	}

	// CREATE USER
	tokenString := ""
	signinRes, err := h.client.User.Signin(body)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	if !signinRes.Success {
		// SIGN UP
		signupRes, err := h.client.User.SignUp(body)
		h.userClientError(c, signupRes, err)

		// SIGN IN AGAIN
		signinResp, err := h.client.User.Signin(body)
		h.userClientError(c, signinResp, err)

		signinRes = signinResp
	}

	if err := json.Unmarshal(signinRes.Data, &tokenString); err != nil {
		return h.responseError(c, 400, err)
	}

	if tokenString == "" {
		return h.responseError(c, 400, errors.New("empty token"))
	}

	claims := &domain.JWTClaims{}
	parseToken, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
		return []byte(h.secret), nil
	})

	if err != nil || !parseToken.Valid {
		return h.responseError(c, 400, errors.New("invalid token"))
	}

	// CREATE PROFILE
	bodyProfile := &domain.ProfileRequest{UserId: claims.ID}
	profileRes, err := h.client.Profile.GetProfile(bodyProfile)
	h.profileClientError(c, profileRes, err)

	if err := json.Unmarshal(profileRes.Data, bodyProfile); err != nil {
		return h.responseError(c, 400, err)
	}

	bodyProfile = &domain.ProfileRequest{
		ID:        bodyProfile.ID,
		UserId:    bodyProfile.ID,
		FullName:  googleRes.FullName,
		FirstName: googleRes.FirstName,
		LastName:  googleRes.LastName,
		Email:     googleRes.Email,
		Image:     googleRes.Image,
	}

	profileResp, err := h.client.Profile.UpdateProfile(bodyProfile)
	h.profileClientError(c, profileResp, err)

	claims = &domain.JWTClaims{
		ID:        claims.ID,
		Username:  googleRes.Email,
		Email:     googleRes.Email,
		FullName:  googleRes.FullName,
		FirstName: googleRes.FirstName,
		LastName:  googleRes.LastName,
		Image:     googleRes.Image,
		Role:      googleRes.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString([]byte(h.secret))
	if err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 200, "Sign In Success", signed)
}

// Helper Func
func (h *handler) userClientError(c *fiber.Ctx, response *domain.UserResponse, err error) error {
	if err != nil {
		return h.responseError(c, 400, err)
	}

	if !response.Success {
		return h.responseError(c, 400, errors.New(response.Error))
	}

	return nil
}

func (h *handler) profileClientError(c *fiber.Ctx, response *domain.ProfileResponse, err error) error {
	if err != nil {
		return h.responseError(c, 400, err)
	}

	if !response.Success {
		return h.responseError(c, 400, errors.New(response.Error))
	}

	return nil
}
