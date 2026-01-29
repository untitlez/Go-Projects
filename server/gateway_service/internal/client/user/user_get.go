package user

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

func (c *user) GetAllUser(body *domain.UserRequest) (*domain.UserResponse, error) {
	limit := strconv.Itoa(body.Limit)
	req, err := http.NewRequest("GET", c.url+"/users?limit="+limit, nil)
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
