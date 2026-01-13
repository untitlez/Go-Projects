package domain

type UnsplashRequest struct {
	Results []results
}

type results struct {
	Urls urls
}

type urls struct {
	Raw     string `json:"raw"`
	Full    string `json:"full"`
	Regular string `json:"regular"`
	Small   string `json:"small"`
}
type UnsplashResponse struct {
	Url string `json:"url,omitempty"`
}

type UnsplashClient interface {
	GetImage(string) (*UnsplashResponse, error)
}
