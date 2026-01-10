package service

import (
	"errors"

	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/google/uuid"
)

// Delete Profile
func (s *service) DeleteProfile(id string) error {
	if id == "" {
		return errors.New("invalid id")
	}

	reqId, err := uuid.Parse(id)
	if err != nil {
		return err
	}

	body := &domain.ProfileRequest{UserId: reqId}
	data, err := s.repo.FindByUserID(body)
	if err != nil {
		return err
	}

	if data == nil {
		return errors.New("profile not found")
	}

	body = &domain.ProfileRequest{ID: data.ID}
	if err := s.repo.Delete(body); err != nil {
		return errors.New("fail to delete Profile")
	}

	return nil
}
