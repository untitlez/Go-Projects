package service

import (
	"errors"

	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
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

// REMOVE IMAGE
func (s *service) RemoveImage(req *domain.CloudinaryRequest) error {
	cld, err := s.client.Cloudinary.CloudinaryClient()
	if err != nil {
		return errors.New("fail to connect cloudinary")
	}

	if _, err := cld.Upload.Destroy(req.Ctx, uploader.DestroyParams{
		PublicID:     "go lang/" + req.FileName,
		ResourceType: "image",
	}); err != nil {
		return errors.New("fail to delete image")
	}

	return nil
}
