package domain

import (
	"context"
	"mime/multipart"

	"github.com/cloudinary/cloudinary-go/v2"
)

type CloudinaryRequest struct {
	Ctx      context.Context
	File     multipart.File
	FileName string
}

type CloudinaryResponse struct {
	URL      string `json:"url,omitempty"`
	PublicID string `json:"public_id,omitempty"`
}

type CloudinaryClient interface {
	CloudinaryClient() (*cloudinary.Cloudinary, error)
}
