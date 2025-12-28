package repository

import (
	"github.com/untitlez/E-Commerce.git/internal/domain"

	"gorm.io/gorm"
)

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *repository {
	return &repository{db: db}
}

func (r *repository) FindAll(req *domain.ProfileRequest) ([]*domain.Profile, error) {
	profile := []*domain.Profile{}
	query := r.db.Order("created_at DESC")

	if req.Limit > 0 {
		query = query.Limit(req.Limit)
	}

	if err := query.Find(&profile).Error; err != nil {
		return nil, err
	}

	return profile, nil
}

func (r *repository) FindByID(req *domain.ProfileRequest) (*domain.Profile, error) {
	profile := &domain.Profile{}
	if err := r.db.First(profile, "id=?", req.ID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}

		return nil, err
	}

	return profile, nil
}

func (r *repository) FindByUserID(req *domain.ProfileRequest) (*domain.Profile, error) {
	profile := &domain.Profile{}
	if err := r.db.First(profile, "user_id=?", req.UserId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}

		return nil, err
	}

	return profile, nil
}

func (r *repository) Create(req *domain.ProfileRequest) error {
	profile := &domain.Profile{UserId: req.UserId}
	return r.db.Create(profile).Error
}

func (r *repository) Update(req *domain.ProfileRequest) error {
	profile := &domain.Profile{
		FullName:  req.FullName,
		Gender:    req.Gender,
		BirthDate: req.BirthDate,
		Email:     req.Email,
		Address:   req.Address,
		CitizenId: req.CitizenId,
		Phone:     req.Phone,
		Image:     req.Image,
	}

	return r.db.Where("id=?", req.ID).Updates(profile).Error
}

func (r *repository) Delete(req *domain.ProfileRequest) error {
	profile := &domain.Profile{}
	return r.db.Unscoped().Delete(profile, req.ID).Error
}
