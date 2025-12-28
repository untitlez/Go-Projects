package service

import (
	"errors"

	"github.com/google/uuid"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

func (s *service) DeleteUser(id string) error {
	if id == "" {
		return errors.New("invalid id")
	}

	reqId, err := uuid.Parse(id)
	if err != nil {
		return err
	}

	body := &domain.UserRequest{ID: reqId}
	data, err := s.repo.FindById(body)
	if err != nil {
		return err
	}

	if data == nil {
		return errors.New("user not found")
	}

	res, err := s.client.Profile.DeleteProfile(body)
	if err != nil {
		return err
	}

	if !res.Success {
		return errors.New(res.Error)
	}

	if err := s.repo.Delete(body); err != nil {
		return errors.New("fail to delete user")
	}

	return nil
}
