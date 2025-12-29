package unsplash

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
)

type unsplash struct {
	http *http.Client
	key  string
}

func NewUnsplashClient(key string) *unsplash {
	return &unsplash{key: key}
}

func (c *unsplash) UnsplashClient() (*domain.UnsplashResponse, error) {
	query := "forest"
	per_page := 10

	path := fmt.Sprintf("https://api.unsplash.com/search/photos?query=%v&per_page=%v&orientation=landscape&client_id=%v", query, per_page, c.key)
	req, err := http.NewRequest("GET", path, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := c.doRequest(req)
	if err != nil {
		return nil, err
	}

	response := &domain.UnsplashResponse{}
	if err := json.Unmarshal(resp, response); err != nil {
		return nil, err
	}

	return response, nil
}

// response func
func (c *unsplash) doRequest(req *http.Request) ([]byte, error) {
	res, err := c.http.Do(req)
	fmt.Println("doRequest", res)
	fmt.Println("err", err)
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
