package service

import (
	"errors"

	"github.com/google/uuid"
	"github.com/untitlez/E-Commerce.git/internal/domain"
	"golang.org/x/crypto/bcrypt"
)

func (s *service) UpdateUser(req *domain.UserRequest) error {
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

	if req.Password != "" && req.Password != data.Password {
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
		if err != nil {
			return err
		}

		body.Password = string(hashPassword)
		body.ResponsePassword = req.Password
	}

	if req.Username != "" {
		body.Username = req.Username
	}

	if req.Role != "" {
		body.Role = req.Role
	}

	if err := s.repo.Update(body); err != nil {
		return errors.New("fail to edit user")
	}

	return nil
}
