package service

import (
	"errors"

	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/google/uuid"
)

// Create Profile
func (s *service) CreateProfile(req *domain.ProfileRequest) error {
	if req.ID == uuid.Nil {
		return errors.New("invalid id")
	}

	body := &domain.ProfileRequest{UserId: req.ID}
	if err := s.repo.Create(body); err != nil {
		return errors.New("fail to create user")
	}

	return nil
}

// UPLOAD IMAGE
func (s *service) UploadImage(req *domain.CloudinaryRequest) (*domain.CloudinaryResponse, error) {
	cld, err := s.client.Cloudinary.CloudinaryClient()
	if err != nil {
		return nil, errors.New("fail to connect cloudinary")
	}

	overWrite := true
	resp, err := cld.Upload.Upload(req.Ctx, req.File, uploader.UploadParams{
		PublicID:  req.FileName,
		Folder:    "go lang",
		Overwrite: &overWrite,
	})
	if err != nil {
		return nil, errors.New("fail to upload new image")
	}

	response := &domain.CloudinaryResponse{
		URL:      resp.SecureURL,
		PublicID: resp.PublicID,
	}

	return response, nil
}
