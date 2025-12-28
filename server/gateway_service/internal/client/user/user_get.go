package user

import (
	"encoding/json"
	"net/http"

	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

func (c *user) GetAllUser(query string) (*domain.UserResponse, error) {
	req, err := http.NewRequest("GET", c.url+"/users?limit="+query, nil)
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
