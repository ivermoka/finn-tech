package main

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB // kansje bad practise, men lettest

func init() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("Error loading .env file")
	}
}

func Connect() {
	connStr := fmt.Sprintf("postgresql://%s:%s@ep-twilight-cell-35826753.eu-central-1.aws.neon.tech/job-scraper?sslmode=require", os.Getenv("NEONUSER"), os.Getenv("NEONPASS"))
	fmt.Println("Connection String:", connStr)
	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	var version string
	if err := db.QueryRow("select version()").Scan(&version); err != nil {
		panic(err)
	}

	fmt.Printf("version=%s\n", version)
}

type Item struct {
	ID    int    `json:"id"`
	Tech  string `json:"tech"`
	Count int    `json:"count"`
}

func getItems() []Item {
	if db == nil {
		fmt.Println("Database connection is not established.")
	}
	rows, err := db.Query("SELECT * FROM technology_counts;")
	if err != nil {
		fmt.Println("Error querying the database:", err)
		return nil
	}
	defer rows.Close()

	var items []Item
	for rows.Next() {
		var item Item
		if err := rows.Scan(&item.ID, &item.Tech, &item.Count); err != nil {
			fmt.Println("Error scanning row:", err)
			return nil
		}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error iterating over rows:", err)
		return nil
	}
	return items
}
