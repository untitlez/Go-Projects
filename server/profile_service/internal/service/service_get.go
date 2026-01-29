package service

import (
	"errors"

	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/google/uuid"
)

// Get All
func (s *service) GetAllProfile(req *domain.ProfileRequest) ([]*domain.ProfileResponse, error) {
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
			FirstName: v.FirstName,
			LastName:  v.LastName,
			Gender:    v.Gender,
			BirthDate: v.BirthDate,
			Email:     v.Email,
			Address:   v.Address,
			Phone:     v.Phone,
			Image:     v.Image,
			CreatedAt: v.CreatedAt,
			UpdatedAt: v.UpdatedAt,
		})
	}

	return response, nil
}

// Get ID
func (s *service) GetProfile(req *domain.ProfileRequest) (*domain.ProfileResponse, error) {
	paramsId := req.Params.ID
	if paramsId == uuid.Nil {
		return nil, errors.New("invalid id")
	}

	body := &domain.ProfileRequest{UserId: paramsId}
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
		FirstName: data.FirstName,
		LastName:  data.LastName,
		Gender:    data.Gender,
		BirthDate: data.BirthDate,
		Email:     data.Email,
		Address:   data.Address,
		Phone:     data.Phone,
		Image:     data.Image,
		CreatedAt: data.CreatedAt,
		UpdatedAt: data.UpdatedAt,
	}

	return response, nil
}
