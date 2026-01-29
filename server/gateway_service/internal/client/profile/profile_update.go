package profile

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

func (c *profile) UpdateProfile(body *domain.ProfileRequest) (*domain.ProfileResponse, error) {
	bodyBytes, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}

	bodyReader := bytes.NewReader(bodyBytes)

	id := body.ID.String()
	req, err := http.NewRequest("PUT", c.url+"/api/profile/"+id, bodyReader)
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
