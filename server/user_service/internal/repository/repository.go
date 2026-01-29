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

func (r *repository) FindAll(req *domain.UserRequest) ([]*domain.User, error) {
	user := []*domain.User{}
	query := r.db.Order("created_at DESC")

	if req.Query.Limit != 0 {
		query = query.Limit(req.Query.Limit)
	}

	if err := query.Find(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (r *repository) FindById(req *domain.UserRequest) (*domain.User, error) {
	user := &domain.User{}
	if err := r.db.First(user, "id=?", req.ID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}

		return nil, err
	}

	return user, nil
}

func (r *repository) FindByUsername(req *domain.UserRequest) (*domain.User, error) {
	user := &domain.User{}
	if err := r.db.First(user, "username=?", req.Username).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}

		return nil, err
	}

	return user, nil
}

func (r *repository) Create(req *domain.UserRequest) (*domain.User, error) {
	user := &domain.User{
		Username:         req.Username,
		Password:         req.Password,
		ResponsePassword: req.ResponsePassword,
	}
	if err := r.db.Create(user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (r *repository) Update(req *domain.UserRequest) error {
	user := &domain.User{
		Username:         req.Username,
		Password:         req.Password,
		ResponsePassword: req.ResponsePassword,
		Role:             req.Role,
	}

	return r.db.Where("id=?", req.ID).Updates(user).Error
}

func (r *repository) Delete(req *domain.UserRequest) error {
	user := &domain.User{}
	return r.db.Unscoped().Delete(user, req.ID).Error
}
