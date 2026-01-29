package service

import (
	"errors"

	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/google/uuid"
)

func (s *service) UpdateProfile(req *domain.ProfileRequest) error {
	paramsId := req.Params.ID
	if paramsId == uuid.Nil {
		return errors.New("invalid id")
	}

	body := &domain.ProfileRequest{ID: paramsId}
	data, err := s.repo.FindByID(body)
	if err != nil {
		return err
	}

	if data == nil {
		return errors.New("profile not found")
	}

	if req.FirstName != "" {
		data.FirstName = req.FirstName
	}

	if req.LastName != "" {
		data.LastName = req.LastName
	}

	fullName := data.FirstName + " " + data.LastName

	body = &domain.ProfileRequest{
		ID:        data.ID,
		FullName:  fullName,
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Gender:    req.Gender,
		BirthDate: req.BirthDate,
		Email:     req.Email,
		Address:   req.Address,
		Phone:     req.Phone,
		Image:     req.Image,
	}

	if err := s.repo.Update(body); err != nil {
		return errors.New("fail to update Profile")
	}

	return nil
}
