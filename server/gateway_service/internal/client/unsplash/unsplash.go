package unsplash

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math/rand/v2"
	"net/http"
	"time"

	"github.com/untitlez/E-Commerce/server/gateway_service/internal/domain"
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

func (c *unsplash) GetImage(query string) (*domain.UnsplashResponse, error) {
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

	request := &domain.UnsplashRequest{}
	if err := json.Unmarshal(resp, request); err != nil {
		return nil, err
	}

	data := request.Results
	if len(data) == 0 {
		return nil, errors.New("image not found")
	}

	random := rand.IntN(len(data))

	response := &domain.UnsplashResponse{
		Url: data[random].Urls.Raw,
	}

	return response, nil
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
