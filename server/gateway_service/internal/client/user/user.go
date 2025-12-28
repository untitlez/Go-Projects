package user

import (
	"io"
	"net/http"
	"time"
)

type user struct {
	http *http.Client
	url  string
}

func NewUserClient(url string) *user {
	return &user{
		http: &http.Client{Timeout: 5 * time.Second},
		url:  url,
	}
}

// response func
func (c *user) doRequest(req *http.Request) ([]byte, error) {
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
