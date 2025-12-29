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

	body = &domain.ProfileRequest{
		ID:             reqId,
		FullName:       req.FullName,
		Gender:         req.Gender,
		BirthDate:      req.BirthDate,
		Email:          req.Email,
		Address:        req.Address,
		CitizenId:      req.CitizenId,
		Phone:          req.Phone,
		Image:          req.Image,
		Position:       req.Position,
		EmploymentType: req.EmploymentType,
		StartDate:      req.StartDate,
		Status:         req.Status,
		YearsOfService: req.YearsOfService,
		Salary:         req.Salary,
	}

	if err := s.repo.Update(body); err != nil {
		return errors.New("fail to update Profile")
	}

	return nil
}
