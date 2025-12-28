package domain

type ProfileClientResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Error   string      `json:"error,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type ProfileClient interface {
	CreateProfile(*UserRequest) (*ProfileClientResponse, error)
	DeleteProfile(*UserRequest) (*ProfileClientResponse, error)
}
