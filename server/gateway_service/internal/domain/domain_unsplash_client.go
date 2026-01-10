package domain

type UnsplashRequest struct {
	Results []results
}

type results struct {
	Urls urls
}

type urls struct {
	Raw     string `json:"raw,omitempty"`
	Full    string `json:"full,omitempty"`
	Regular string `json:"regular,omitempty"`
	Small   string `json:"small,omitempty"`
}
type UnsplashResponse struct {
	Url string `json:"url,omitempty"`
}

type UnsplashClient interface {
	GetImage(string) (*UnsplashResponse, error)
}
