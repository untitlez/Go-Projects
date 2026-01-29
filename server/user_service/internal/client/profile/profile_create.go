package profile

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/untitlez/E-Commerce.git/internal/domain"
)

func (c *profile) CreateProfile(req *domain.ProfileClientRequest) (*domain.ProfileClientResponse, error) {
	bodyBytes, err := json.Marshal(req)
	if err != nil {
		return nil, err
	}

	bodyReader := bytes.NewReader(bodyBytes)

	clientReq, err := http.NewRequest("POST", c.url, bodyReader)
	if err != nil {
		return nil, err
	}

	clientReq.Header.Set("Content-Type", "application/json")

	resp, err := c.doRequest(clientReq)
	if err != nil {
		return nil, err
	}

	response := &domain.ProfileClientResponse{}
	if err := json.Unmarshal(resp, response); err != nil {
		return nil, err
	}

	return response, nil
}
