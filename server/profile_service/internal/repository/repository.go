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

func (r *repository) FindAll(req *domain.ProfileQuery) ([]*domain.Profile, error) {
	profile := []*domain.Profile{}
	query := r.db.Order("created_at DESC")

	if req.FirstName != "" {
		query = query.Where("first_name LIKE ?", "%"+req.FirstName+"%")
	}

	if req.LastName != "" {
		query = query.Where("last_name LIKE ?", "%"+req.LastName+"%")
	}

	if req.Gender != "" {
		query = query.Where("gender LIKE ?", "%"+req.Gender+"%")
	}

	if req.Email != "" {
		query = query.Where("email LIKE ?", "%"+req.Email+"%")
	}

	if req.Address != "" {
		query = query.Where("address LIKE ?", "%"+req.Address+"%")
	}

	limit := req.Limit
	if limit <= 0 || limit > 100 {
		limit = 50
	}

	offset := req.Offset
	if offset < 0 {
		offset = 0
	}

	if err := query.Limit(limit).Offset(offset).Find(&profile).Error; err != nil {
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
		Phone:     req.Phone,
		Image:     req.Image,
	}

	return r.db.Where("id=?", req.ID).Updates(profile).Error
}

func (r *repository) Delete(req *domain.ProfileRequest) error {
	profile := &domain.Profile{}
	return r.db.Unscoped().Delete(profile, req.ID).Error
}
