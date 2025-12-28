package repository

// import "server/services/user_service/internal/domain"

// // Search FullName
// func (r *repository) FindByFullName(filter *domain.Query) ([]*domain.User, error) {
// 	users := []*domain.User{}
// 	if err := r.db.Where("fullname ILIKE ?", filter).Find(&users).Error; err != nil {
// 		return nil, err
// 	}

// 	return users, nil
// }

// // Search Username
// func (r *repository) FindByUsername(filter *domain.Query) ([]*domain.User, error) {
// 	users := []*domain.User{}
// 	if err := r.db.Where("username ILIKE ?", filter).Find(&users).Error; err != nil {
// 		return nil, err
// 	}

// 	return users, nil
// }

// // Search Password
// func (r *repository) FindByPassword(filter *domain.Query) ([]*domain.User, error) {
// 	users := []*domain.User{}
// 	if err := r.db.Where("password ILIKE ?", filter.Password).Find(&users).Error; err != nil {
// 		return nil, err
// 	}

// 	return users, nil
// }

// // Search All
// func (r *repository) FindBySearch(filter *domain.Query) ([]*domain.User, error) {
// 	users := []*domain.User{}
// 	if err := r.db.Where("fullname ILIKE ? AND email ILIKE ? AND password ILIKE ?", filter.FullName, filter.Username, filter.Password).Find(&users).Error; err != nil {
// 		return nil, err
// 	}

// 	return users, nil
// }
