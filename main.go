package main

import (
	"coinFlip/internal/handlers"
	"fmt"
	"html/template"
	"net/http"
)

func main()  {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	handlers.Tmpl["index.html"] = template.Must(template.ParseFiles("templates/layout.html", "templates/index.html"))

  http.HandleFunc("/", handlers.RootPageHandler)

	fmt.Println("Listening on :8080")
	http.ListenAndServe(":8080", nil)
}