package profile

import (
	"io"
	"net/http"
	"time"
)

type profile struct {
	http *http.Client
	url  string
}

func NewProfileClient(url string) *profile {
	return &profile{
		http: &http.Client{
			Timeout: 5 * time.Second,
		},
		url: url,
	}
}

// response func
func (c *profile) doRequest(req *http.Request) ([]byte, error) {
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
