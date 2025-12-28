## 📂 Project Structure

---

### CLIENT

```plaintext

client/
├── app/
│   ├── (pages)/                  
│   │   ├── auth/
│   │   │   ├── signin/page.tsx
│   │   │   └── signup/page.tsx
│   │   │
│   │   └── profile/
│   │       ├── [id]/page.tsx     
│   │       └── all-account/page.tsx
│   │   
│   ├── layout.tsx                
│   ├── globals.css
│   ├── page.tsx                  
│   └── loading.tsx               
│                         
├── components/
│   ├── auth/
│   │   ├── auth-detail-account-more.tsx
│   │   ├── auth-detail-account.tsx
│   │   ├── auth-detail-expire.tsx
│   │   ├── auth-detail-profile.tsx
│   │   ├── auth-detail.tsx
│   │   ├── auth-google-provider.tsx
│   │   ├── auth-signin-form-input.tsx
│   │   ├── auth-signin-form.tsx
│   │   ├── auth-signup-form-input.tsx
│   │   └── auth-signup-form.tsx
│   │
│   ├── profile/
│   │  ├── profile-account-submit.tsx
│   │  ├── profile-account.tsx
│   │  ├── profile-detail-calendar.tsx
│   │  ├── profile-detail-input.tsx
│   │  ├── profile-detail-radio.tsx
│   │  ├── profile-detail-submit.tsx
│   │  ├── profile-detail-textarea.tsx
│   │  ├── profile-detail.tsx
│   │  ├── profile-image.tsx
│   │  ├── profile-table-body.tsx
│   │  ├── profile-table-nobody.tsx
│   │  ├── profile-table-pagination.tsx
│   │  └── profile-table.tsx
│   │
│   ├── sidebar/
│   │  ├── app-sidebar.tsx
│   │  ├── sidebar-account.tsx
│   │  ├── sidebar-header.tsx
│   │  ├── sidebar-left-menu.tsx
│   │  ├── sidebar-left.tsx
│   │  └── sidebar-right.tsx
│   │
│   ├── theme/
│   │  ├── theme-provider.tsx 
│   │  └── theme-toggle.tsx
│   │
│   ├── ui/
│   │  └── shadcn ui ...
│   │
│   ├── auth-provider.tsx
│   ├── progress-page.tsx
│   ├── refresh-page.tsx
│   └── unauthorized-page.tsx
│   
├── lib/
│   ├── use-client/
│   │   ├── axios-auth.ts
│   │   ├── axios-profile.ts
│   │   ├── axios.user.ts
│   │   │
│   │   ├── hook/
│   │   │   ├── use-mobile.ts
│   │   │   ├── use-auth.ts
│   │   │   ├── use-profile.ts
│   │   │   └── use-user.ts
│   │   │
│   │   └── store/
│   │       ├── store-auth.ts
│   │       └── store-profile.ts
│   │   
│   ├── use-server/
│   │   ├── fetch-account.ts
│   │   └── fetch-server.ts
│   │   
│   ├── config.ts
│   ├── routes.ts
│   └── utils.ts 
│
├── validators/
│   ├── account.validator.ts
│   ├── profile.validator.ts
│   ├── user.validator.ts
│   └── session.validator.ts
│
├── public/                   
├── .env
└── package.json

```
---

### SERVER

```plaintext

server/
├── gateway_service/
│   ├── cmd/
│   │   └── main.go               
│   │   
│   ├── config/
│   │   ├── config.go             
│   │   └── config.yml            
│   │   
│   ├── internal/
│   │   ├── client/               
│   │   │   ├── user/
│   │   │   │   ├── user_get.go
│   │   │   │   ├── user_signin.go
│   │   │   │   ├── user_signup.go
│   │   │   │   └── user.go
│   │   │   └── client.go
│   │   │
│   │   ├── domain/          
│   │   │   ├── domain_client.go 
│   │   │   └── domain.go
│   │   │
│   │   ├── handler/              
│   │   │   ├── handler_get.go 
│   │   │   ├── handler_session.go 
│   │   │   ├── handler_signin.go 
│   │   │   ├── handler_signout.go 
│   │   │   ├── handler_signup.go 
│   │   │   └── handler.go
│   │   │
│   │   └── middleware/
│   │       ├── cors.go
│   │       └── middleware.go
│   │   
│   ├── Dockerfile
│   ├── go.mod
│   └── go.sum
│   
├── user_service/
│   ├── cmd/
│   │   └── main.go               
│   │   
│   ├── config/
│   │   ├── config.go
│   │   ├── config.yaml
│   │   └── db.go
│   │   
│   ├── internal/
│   │   ├── client/               
│   │   │   ├── user/
│   │   │   │   ├── profile_create.go 
│   │   │   │   ├── profile_delete.go 
│   │   │   │   └── profile.go
│   │   │   └── client.go
│   │   │
│   │   ├── domain/          
│   │   │   ├── domain_client.go 
│   │   │   ├── domain_handler.go 
│   │   │   ├── domain_jwt.go 
│   │   │   └── domain.go
│   │   │
│   │   ├── handler/              
│   │   │   ├── handler_create.go 
│   │   │   ├── handler_delete.go 
│   │   │   ├── handler_get.go 
│   │   │   ├── handler_update.go 
│   │   │   └── handler.go
│   │   │
│   │   ├── repository.go/               
│   │   │   └── repository.go
│   │   │
│   │   └── service/              
│   │       ├── service_delete.go 
│   │       ├── service_get.go 
│   │       ├── service_signin.go 
│   │       ├── service_signup.go 
│   │       ├── service_update.go 
│   │       └── service.go
│   │   
│   ├── Dockerfile
│   ├── go.mod
│   └── go.sum
│   
├── profile_service/
│   ├── cmd/
│   │   └── main.go               
│   │   
│   ├── config/
│   │   ├── config.go
│   │   ├── config.yaml
│   │   └── db.go
│   │   
│   ├── internal/
│   │   ├── client/               
│   │   │   ├── cloudinary/
│   │   │   │   └── cloudinary.go
│   │   │   └── client.go
│   │   │
│   │   ├── domain/          
│   │   │   ├── domain_cloudinary.go 
│   │   │   ├── domain_handler.go 
│   │   │   └── domain.go
│   │   │
│   │   ├── handler/              
│   │   │   ├── handler_create.go 
│   │   │   ├── handler_delete.go 
│   │   │   ├── handler_get.go 
│   │   │   ├── handler_update.go 
│   │   │   └── handler.go
│   │   │
│   │   ├── repository.go/               
│   │   │   ├── repository_search.go 
│   │   │   └── repository.go
│   │   │
│   │   └── service/              
│   │       ├── service_create.go 
│   │       ├── service_delete.go 
│   │       ├── service_get.go 
│   │       ├── service_update.go 
│   │       └── service.go
│   │   
│   ├── Dockerfile
│   ├── go.mod
│   └── go.sum
│   
├── docker-compose.yml        
├── .dockerignore
└── .gitignore

```
