package service

import (
	"errors"
	"strconv"

	"github.com/google/uuid"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

// Get All
func (s *service) GetAllUser(req string) ([]*domain.UserResponse, error) {
	query, err := s.getQuery(req)
	if err != nil {
		return nil, err
	}

	data, err := s.repo.FindAll(query)
	if err != nil {
		return nil, err
	}

	response := []*domain.UserResponse{}
	if len(data) == 0 {
		return response, errors.New("users not found")
	}

	for _, v := range data {
		response = append(response, &domain.UserResponse{
			ID:               v.ID,
			Username:         v.Username,
			ResponsePassword: v.ResponsePassword,
			CreatedAt:        v.CreatedAt,
			UpdatedAt:        v.UpdatedAt,
		})
	}

	return response, nil
}

// Get ID
func (s *service) GetUser(id string) (*domain.UserResponse, error) {
	if id == "" {
		return nil, errors.New("invalid id")
	}

	reqId, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}

	body := &domain.UserRequest{ID: reqId}
	data, err := s.repo.FindById(body)
	if err != nil {
		return nil, err
	}

	if data == nil {
		return nil, errors.New("user not found")
	}

	response := &domain.UserResponse{
		ID:               data.ID,
		Username:         data.Username,
		ResponsePassword: data.ResponsePassword,
		CreatedAt:        data.CreatedAt,
		UpdatedAt:        data.UpdatedAt,
	}

	return response, nil
}

// Query Func
func (s *service) getQuery(query string) (*domain.UserRequest, error) {
	req := &domain.UserRequest{}

	if query != "" {
		limit, err := strconv.Atoi(query)
		if err != nil {
			return nil, err
		}

		if limit < 0 {
			return nil, errors.New("limit must be positive")
		}

		req = &domain.UserRequest{Limit: limit}
	}

	return req, nil
}
