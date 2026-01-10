package domain

type UserResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Error   string      `json:"error,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type UserClient interface {
	SignUp(*GatewayRequest) (*UserResponse, error)
	Signin(*GatewayRequest) (*UserResponse, error)
	GetAllUser(string) (*UserResponse, error)
}
