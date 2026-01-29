package unsplash

import (
	"io"
	"net/http"
	"time"
)

type unsplash struct {
	http *http.Client
	key  string
}

func NewUnsplashClient(key string) *unsplash {
	return &unsplash{
		http: &http.Client{Timeout: 5 * time.Second},
		key:  key,
	}
}

// response func
func (c *unsplash) doRequest(req *http.Request) ([]byte, error) {
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
