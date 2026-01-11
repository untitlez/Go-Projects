package host

import (
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

type host struct {
	http *http.Client
	url  string
}

func NewHostClient(url string) *host {
	return &host{
		http: &http.Client{Timeout: 5 * time.Second},
		url:  url,
	}
}

func (c *host) GetHost(path string) (*domain.GatewayResponse, error) {
	req, err := http.NewRequest("GET", c.url+path, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := c.doRequest(req)
	if err != nil {
		return nil, err
	}

	response := &domain.GatewayResponse{}
	if err := json.Unmarshal(resp, response); err != nil {
		return nil, err
	}

	return response, nil
}

// response func
func (c *host) doRequest(req *http.Request) ([]byte, error) {
	res, err := c.http.Do(req)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	bodyBytes, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	return bodyBytes, nil
}
