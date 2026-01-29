package handler

import (
	"context"

	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/gofiber/fiber/v2"
)

// Update Profile
func (h *handler) UpdateProfile(c *fiber.Ctx) error {
	req := &domain.ProfileRequest{}
	if err := c.ParamsParser(&req.Params); err != nil {
		return h.responseError(c, 400, err)
	}

	if err := c.BodyParser(req); err != nil {
		return err
	}

	if err := h.sv.UpdateProfile(req); err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 200, "Update Success", nil)
}

// Update Image
func (h *handler) UploadImage(c *fiber.Ctx) error {
	fileHeader, err := c.FormFile("file")
	if err != nil {
		return h.responseError(c, 400, err)
	}

	file, err := fileHeader.Open()
	if err != nil {
		return h.responseError(c, 400, err)
	}

	defer file.Close()

	ctx := context.Background()
	fileName := fileHeader.Filename

	req := &domain.CloudinaryRequest{
		Ctx:      ctx,
		File:     file,
		FileName: fileName,
	}

	res, err := h.sv.UploadImage(req)
	if err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 202, "", res.URL)
}
