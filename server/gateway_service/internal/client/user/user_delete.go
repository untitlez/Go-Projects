package user

import (
	"encoding/json"
	"net/http"

	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

func (c *user) DeleteUser(body *domain.UserRequest) (*domain.UserResponse, error) {
	id := body.ID.String()
	req, err := http.NewRequest("DELETE", c.url+"/api/user/"+id, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := c.doRequest(req)
	if err != nil {
		return nil, err
	}

	response := &domain.UserResponse{}
	if err := json.Unmarshal(resp, response); err != nil {
		return nil, err
	}

	return response, nil
}
