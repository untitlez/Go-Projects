package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Profile struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	UserId    uuid.UUID `gorm:"type:uuid;unique"`
	FullName  string
	Gender    string
	BirthDate string
	Email     string
	Address   string
	CitizenId string
	Phone     string
	Image     string
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type ProfileRequest struct {
	ID        uuid.UUID `json:"id,omitempty"`
	FullName  string    `json:"full_name,omitempty"`
	Gender    string    `json:"gender,omitempty"`
	BirthDate string    `json:"birth_date,omitempty"`
	Email     string    `json:"email,omitempty"`
	Address   string    `json:"address,omitempty"`
	CitizenId string    `json:"citizen_id,omitempty"`
	Phone     string    `json:"phone,omitempty"`
	Image     string    `json:"image,omitempty"`

	// User Client
	UserId uuid.UUID `json:"user_id,omitempty"`

	// Query
	Limit int    `json:"limit,omitempty"`
	Query string `json:"query,omitempty"`
}

type ProfileResponse struct {
	ID        uuid.UUID `json:"id"`
	UserId    uuid.UUID `json:"user_id"`
	FullName  string    `json:"full_name"`
	Gender    string    `json:"gender"`
	BirthDate string    `json:"birth_date"`
	Email     string    `json:"email"`
	Address   string    `json:"address"`
	CitizenId string    `json:"citizen_id"`
	Phone     string    `json:"phone"`
	Image     string    `json:"image"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
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
	GetAllProfile(string) ([]*ProfileResponse, error)
	GetProfile(string) (*ProfileResponse, error)
	UpdateProfile(string, *ProfileRequest) error
	CreateProfile(*ProfileRequest) error
	DeleteProfile(string) error

	// Cloudinary Client
	UploadImage(*CloudinaryRequest) (*CloudinaryResponse, error)
	RemoveImage(*CloudinaryRequest) error
}

func (u *Profile) BeforeCreate(tx *gorm.DB) (err error) {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return
}
