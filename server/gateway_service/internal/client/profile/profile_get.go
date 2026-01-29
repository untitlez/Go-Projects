package profile

import (
	"encoding/json"
	"net/http"

	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

func (c *profile) GetProfile(body *domain.ProfileRequest) (*domain.ProfileResponse, error) {
	userId := body.UserId.String()
	req, err := http.NewRequest("GET", c.url+"/api/profile/"+userId, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := c.doRequest(req)
	if err != nil {
		return nil, err
	}

	response := &domain.ProfileResponse{}
	if err := json.Unmarshal(resp, response); err != nil {
		return nil, err
	}

	return response, nil
}
