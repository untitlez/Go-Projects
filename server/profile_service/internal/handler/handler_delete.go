package handler

import (
	"context"

	"github.com/untitlez/E-Commerce.git/internal/domain"

	"github.com/gofiber/fiber/v2"
)

// Delete Profile
func (h *handler) DeleteProfile(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := h.sv.DeleteProfile(id); err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 202, "Delete Success", nil)
}

// Remove Image
func (h *handler) RemoveImage(c *fiber.Ctx) error {
	fileHeader, err := c.FormFile("file")
	if err != nil {
		return h.responseError(c, 400, err)
	}

	ctx := context.Background()
	fileName := fileHeader.Filename

	req := &domain.CloudinaryRequest{
		Ctx:      ctx,
		FileName: fileName,
	}

	if err := h.sv.RemoveImage(req); err != nil {
		return h.responseError(c, 400, err)
	}

	return h.responseSuccess(c, 202, "Remove Upload Image Success", nil)
}
