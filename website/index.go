package api

import (
	"net/http"
)

func main() {
	Connect()
	http.HandleFunc("/api/items", Handler)

	port := "8080"
	println("Server is running on port " + port)
	http.ListenAndServe(":"+port, nil)
}
