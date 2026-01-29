package service

import (
	"errors"

	"github.com/google/uuid"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

// Get All
func (s *service) GetAllUser(req *domain.UserRequest) ([]*domain.UserResponse, error) {
	limit := req.Query.Limit
	if limit < 0 {
		return nil, errors.New("limit must be positive")
	}

	if limit <= 0 || limit > 100 {
		limit = 50
	}

	offset := req.Query.Offset
	if offset < 0 {
		offset = 0
	}

	q := req.Query
	q.Limit = limit
	q.Offset = offset
	body := &domain.UserRequest{Query: q}

	data, err := s.repo.FindAll(body)
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
func (s *service) GetUser(req *domain.UserRequest) (*domain.UserResponse, error) {
	paramsId := req.Params.ID
	if paramsId == uuid.Nil {
		return nil, errors.New("invalid id")
	}

	body := &domain.UserRequest{ID: paramsId}
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
