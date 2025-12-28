package cloudinary

import (
	cloud "github.com/cloudinary/cloudinary-go/v2"
)

type cloudinary struct {
	url string
}

func NewCloudinaryClient(url string) *cloudinary {
	return &cloudinary{url: url}
}

func (c *cloudinary) CloudinaryClient() (*cloud.Cloudinary, error) {
	cld, err := cloud.NewFromURL(c.url)
	if err != nil {
		return nil, err
	}

	cld.Config.URL.Secure = true

	return cld, err
}
