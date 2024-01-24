package api

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

func main() {
	err := Connect()
	if err != nil {
		fmt.Println(err)
	}
	http.HandleFunc("/api/items", Handler)

	port := "8080"
	println("Server is running on port " + port)
	http.ListenAndServe(":"+port, nil)
}

func Handler(w http.ResponseWriter, r *http.Request) {
	items := getItems()
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

var db *sql.DB // kansje bad practise, men lettest

func init() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("Error loading .env file")
	}
}
func Connect() error {
    connStr := fmt.Sprintf("postgresql://%s:%s@ep-twilight-cell-35826753.eu-central-1.aws.neon.tech/job-scraper?sslmode=require", os.Getenv("NEONUSER"), os.Getenv("NEONPASS"))
    fmt.Println("Connection String:", connStr)
    var err error
    db, err = sql.Open("postgres", connStr)
    if err != nil {
        return fmt.Errorf("failed to open database connection: %v", err)
    }

    var version string
    if err := db.QueryRow("select version()").Scan(&version); err != nil {
        return fmt.Errorf("failed to query database version: %v", err)
    }

    fmt.Printf("version=%s\n", version)
    return nil
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