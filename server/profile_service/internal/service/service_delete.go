package service

import (
	"errors"

	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/google/uuid"
)

// Delete Profile
func (s *service) DeleteProfile(req *domain.ProfileRequest) error {
	paramsId := req.Params.ID
	if paramsId == uuid.Nil {
		return errors.New("invalid id")
	}

	body := &domain.ProfileRequest{UserId: paramsId}
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
