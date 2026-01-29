package profile

import (
	"encoding/json"
	"net/http"

	"github.com/untitlez/E-Commerce.git/internal/domain"
)

func (c *profile) DeleteProfile(req *domain.ProfileClientRequest) (*domain.ProfileClientResponse, error) {
	id := req.ID.String()
	clientReq, err := http.NewRequest("DELETE", c.url+"/"+id, nil)
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
