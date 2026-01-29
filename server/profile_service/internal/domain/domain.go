package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Profile struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	UserId    uuid.UUID `gorm:"type:uuid;unique"`
	FullName  string    `gorm:"index"`
	FirstName string
	LastName  string
	Gender    string `gorm:"index"`
	BirthDate string
	Email     string `gorm:"index"`
	Address   string `gorm:"index"`
	Phone     string
	Image     string
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type ProfileRequest struct {
	ID        uuid.UUID `json:"id"`
	UserId    uuid.UUID `json:"user_id"`
	FullName  string    `json:"full_name"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Gender    string    `json:"gender"`
	BirthDate string    `json:"birth_date"`
	Email     string    `json:"email"`
	Address   string    `json:"address"`
	Phone     string    `json:"phone"`
	Image     string    `json:"image"`
	Params    ProfileParams
	Query     ProfileQuery
}

type ProfileResponse struct {
	ID        uuid.UUID `json:"id"`
	UserId    uuid.UUID `json:"user_id"`
	FullName  string    `json:"full_name"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Gender    string    `json:"gender"`
	BirthDate string    `json:"birth_date"`
	Email     string    `json:"email"`
	Address   string    `json:"address"`
	Phone     string    `json:"phone"`
	Image     string    `json:"image"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// OPTION
type ProfileParams struct {
	ID uuid.UUID `params:"id"`
}

type ProfileQuery struct {
	Name    string `query:"name,omitempty"`
	Gender  string `query:"gender,omitempty"`
	Email   string `query:"email,omitempty"`
	Address string `query:"address,omitempty"`
	Phone   string `query:"phone,omitempty"`
	Limit   int    `query:"limit,omitempty"`
	Offset  int    `query:"offset,omitempty"`
}

type ProfileRepository interface {
	FindAll(*ProfileRequest) ([]*Profile, error)
	FindByID(*ProfileRequest) (*Profile, error)
	FindByUserID(*ProfileRequest) (*Profile, error)
	Create(*ProfileRequest) error
	Update(*ProfileRequest) error
	Delete(*ProfileRequest) error
}

type ProfileService interface {
	GetAllProfile(*ProfileRequest) ([]*ProfileResponse, error)
	GetProfile(*ProfileRequest) (*ProfileResponse, error)
	UpdateProfile(*ProfileRequest) error
	CreateProfile(*ProfileRequest) error
	DeleteProfile(*ProfileRequest) error

	// Cloudinary Client
	UploadImage(*CloudinaryRequest) (*CloudinaryResponse, error)
}

func (u *Profile) BeforeCreate(tx *gorm.DB) (err error) {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return
}
