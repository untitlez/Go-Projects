package service

import (
	"errors"

	"github.com/google/uuid"
	"github.com/untitlez/E-Commerce.git/internal/domain"
)

func (s *service) DeleteUser(req *domain.UserRequest) error {
	paramsId := req.Params.ID
	if paramsId == uuid.Nil {
		return errors.New("invalid id")
	}

	body := &domain.UserRequest{ID: paramsId}
	data, err := s.repo.FindById(body)
	if err != nil {
		return err
	}

	if data == nil {
		return errors.New("user not found")
	}

	bodyClient := &domain.ProfileClientRequest{ID: paramsId}
	res, err := s.client.Profile.DeleteProfile(bodyClient)
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
