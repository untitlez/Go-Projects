package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID               uuid.UUID `gorm:"type:uuid;primaryKey"`
	Username         string    `gorm:"unique"`
	Password         string
	ResponsePassword string
	Role             string `gorm:"default:MEMBER"`
	CreatedAt        time.Time
	UpdatedAt        time.Time
	DeletedAt        gorm.DeletedAt `gorm:"index"`
}

type UserRequest struct {
	ID               uuid.UUID `json:"id"`
	Username         string    `json:"username"`
	Password         string    `json:"password"`
	ResponsePassword string    `json:"response_password"`
	Role             string    `json:"role"`
	Params           UserRequestParams
	Query            UserRequestQuery
}

type UserResponse struct {
	ID               uuid.UUID `json:"id,omitempty"`
	Username         string    `json:"username,omitempty"`
	ResponsePassword string    `json:"password,omitempty"`
	CreatedAt        time.Time `json:"created_at,omitempty"`
	UpdatedAt        time.Time `json:"updated_at,omitempty"`

	SignedToken string `json:"signed_token,omitempty"`
}

// OPTION
type UserRequestParams struct {
	ID uuid.UUID `params:"id"`
}

type UserRequestQuery struct {
	Username string `query:"username,omitempty"`
	Role     string `query:"role,omitempty"`
	Limit    int    `query:"limit,omitempty"`
	Offset   int    `query:"offset,omitempty"`
}

type UserService interface {
	GetAllUser(*UserRequest) ([]*UserResponse, error)
	GetUser(*UserRequest) (*UserResponse, error)
	UpdateUser(*UserRequest) error
	DeleteUser(*UserRequest) error
	SignUp(*UserRequest) error
	SignIn(*UserRequest) (*UserResponse, error)
}

type UserRepository interface {
	FindByUsername(*UserRequest) (*User, error)
	FindAll(*UserRequest) ([]*User, error)
	FindById(*UserRequest) (*User, error)
	Create(*UserRequest) (*User, error)
	Update(*UserRequest) error
	Delete(*UserRequest) error
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return
}
