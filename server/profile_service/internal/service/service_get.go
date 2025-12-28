package service

import (
	"errors"
	"strconv"

	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/google/uuid"
)

// Get All
func (s *service) GetAllProfile(query string) ([]*domain.ProfileResponse, error) {
	req := &domain.ProfileRequest{}

	data, err := s.repo.FindAll(req)
	if err != nil {
		return nil, errors.New("profile no data")
	}

	response := []*domain.ProfileResponse{}
	if len(data) == 0 {
		return response, errors.New("profile not found")
	}

	for _, v := range data {
		response = append(response, &domain.ProfileResponse{
			ID:        v.ID,
			UserId:    v.UserId,
			FullName:  v.FullName,
			Gender:    v.Gender,
			BirthDate: v.BirthDate,
			Email:     v.Email,
			Address:   v.Address,
			CitizenId: v.CitizenId,
			Phone:     v.Phone,
			Image:     v.Image,
			CreatedAt: v.CreatedAt,
			UpdatedAt: v.UpdatedAt,
		})
	}

	return response, nil
}

// Get ID
func (s *service) GetProfile(id string) (*domain.ProfileResponse, error) {
	if id == "" {
		return nil, errors.New("invalid id")
	}

	reqId, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}

	body := &domain.ProfileRequest{UserId: reqId}
	data, err := s.repo.FindByUserID(body)
	if err != nil {
		return nil, err
	}

	if data == nil {
		return nil, errors.New("profile not found")
	}

	response := &domain.ProfileResponse{
		ID:        data.ID,
		UserId:    data.UserId,
		FullName:  data.FullName,
		Gender:    data.Gender,
		BirthDate: data.BirthDate,
		Email:     data.Email,
		Address:   data.Address,
		CitizenId: data.CitizenId,
		Phone:     data.Phone,
		Image:     data.Image,
		CreatedAt: data.CreatedAt,
		UpdatedAt: data.UpdatedAt,
	}

	return response, nil
}

// Query Func
func getQuery(query string) (*domain.ProfileRequest, error) {
	req := &domain.ProfileRequest{}

	if query != "" {
		limit, err := strconv.Atoi(query)
		if err != nil {
			return nil, err
		}

		if limit < 0 {
			return nil, errors.New("limit must be positive")
		}

		req = &domain.ProfileRequest{Limit: limit}
	}

	return req, nil
}
