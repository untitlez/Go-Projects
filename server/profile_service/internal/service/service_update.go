package service

import (
	"errors"

	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/google/uuid"
)

func (s *service) UpdateProfile(id string, req *domain.ProfileRequest) error {
	if id == "" {
		return errors.New("invalid id")
	}

	reqId, err := uuid.Parse(id)
	if err != nil {
		return err
	}

	body := &domain.ProfileRequest{ID: reqId}
	data, err := s.repo.FindByID(body)
	if err != nil {
		return err
	}

	if data == nil {
		return errors.New("profile not found")
	}

	fullName := req.FirstName + " " + req.LastName

	body = &domain.ProfileRequest{
		ID:        reqId,
		FullName:  fullName,
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
