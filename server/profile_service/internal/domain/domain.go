package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Profile struct {
	ID             uuid.UUID `gorm:"type:uuid;primaryKey"`
	UserId         uuid.UUID `gorm:"type:uuid;unique"`
	FullName       string
	Gender         string
	BirthDate      string
	Email          string
	Address        string
	CitizenId      string
	Phone          string
	Image          string
	Position       string
	EmploymentType string
	StartDate      string
	Status         string
	YearsOfService int
	Salary         int
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      gorm.DeletedAt `gorm:"index"`
}

type ProfileRequest struct {
	ID             uuid.UUID `json:"id,omitempty"`
	FullName       string    `json:"full_name,omitempty"`
	Gender         string    `json:"gender,omitempty"`
	BirthDate      string    `json:"birth_date,omitempty"`
	Email          string    `json:"email,omitempty"`
	Address        string    `json:"address,omitempty"`
	CitizenId      string    `json:"citizen_id,omitempty"`
	Phone          string    `json:"phone,omitempty"`
	Image          string    `json:"image,omitempty"`
	Position       string    `json:"position,omitempty"`
	EmploymentType string    `json:"employment_type,omitempty"`
	StartDate      string    `json:"start_date,omitempty"`
	Status         string    `json:"status,omitempty"`
	YearsOfService int       `json:"years_of_service,omitempty"`
	Salary         int       `json:"salary,omitempty"`

	// User Client
	UserId uuid.UUID `json:"user_id,omitempty"`

	// Query
	Limit int    `json:"limit,omitempty"`
	Query string `json:"query,omitempty"`
}

type ProfileResponse struct {
	ID             uuid.UUID `json:"id"`
	UserId         uuid.UUID `json:"user_id"`
	FullName       string    `json:"full_name"`
	Gender         string    `json:"gender"`
	BirthDate      string    `json:"birth_date"`
	Email          string    `json:"email"`
	Address        string    `json:"address"`
	CitizenId      string    `json:"citizen_id"`
	Phone          string    `json:"phone"`
	Image          string    `json:"image"`
	Position       string    `json:"position"`
	EmploymentType string    `json:"employment_type"`
	StartDate      string    `json:"start_date"`
	Status         string    `json:"status"`
	YearsOfService int       `json:"years_of_service"`
	Salary         int       `json:"salary"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

type LeaveDays struct {
	SickLeave     int `json:"sick_leave"`
	PersonalLeave int `json:"personal_leave"`
	VacationLeave int `json:"vacation_leave"`
}

type Approval struct {
	Days      int    `json:"days"`
	Note      string `json:"note"`
	LeaveDate string `json:"leave_date"`
	LeaveType string `json:"leave_type"`
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
}

func (u *Profile) BeforeCreate(tx *gorm.DB) (err error) {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return
}
