package main

import (
	"net/http"
	"encoding/json"
	//	"github.com/gorilla/mux"
)

func getItemsHandler(w http.ResponseWriter, r *http.Request) {
	items := getItems()
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func main() {
	Connect()
	http.HandleFunc("/api/items", getItemsHandler)

	port := "8080"
	println("Server is running on port " + port)
	http.ListenAndServe(":"+port, nil)
}
