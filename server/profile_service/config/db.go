package config

import (
	"log"

	"github.com/untitlez/E-Commerce.git/internal/domain"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func InitDB(cfg *Config) *gorm.DB {
	dsn := cfg.DB.Database
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default,
	})

	if err != nil {
		log.Fatalf("failed to to connect to database: %v", err.Error())
	}

	if err = db.AutoMigrate(&domain.Profile{}); err != nil {
		log.Fatalf("failed to auto migrate Auth model: %v", err)
	}

	return db
}
