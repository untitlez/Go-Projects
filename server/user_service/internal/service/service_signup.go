package service

import (
	"errors"

	"github.com/untitlez/E-Commerce.git/internal/domain"
	"golang.org/x/crypto/bcrypt"
)

func (s *service) SignUp(req *domain.UserRequest) error {
	filter := req.Username == "" && req.Password == ""
	if filter {
		return errors.New("please enter your username and password.")
	}

	body := &domain.UserRequest{
		Username: req.Username,
		Password: req.Password,
	}

	data, err := s.repo.FindByUsername(body)
	if err != nil {
		return err
	}

	if data == nil {
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
		if err != nil {
			return err
		}

		body = &domain.UserRequest{
			Username:         body.Username,
			Password:         string(hashPassword),
			ResponsePassword: body.Password,
		}

		data, err := s.repo.Create(body)
		if err != nil {
			return errors.New("fail to sign up")
		}

		body = &domain.UserRequest{ID: data.ID}
		res, err := s.client.Profile.CreateProfile(body)
		if err != nil {
			if err := s.repo.Delete(body); err != nil {
				return err
			}

			return err
		}

		if !res.Success {
			if err := s.repo.Delete(body); err != nil {
				return err
			}

			return errors.New(res.Error)
		}

		return nil
	}

	return errors.New("username already exists")
}
