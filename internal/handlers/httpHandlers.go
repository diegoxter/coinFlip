package handlers

import (
	"html/template"
	"net/http"
)

var Tmpl = make(map[string]*template.Template)

type PageData struct {
	Title   string
	Heading string
	IsLoggedIn bool
}

func RootPageHandler(w http.ResponseWriter, r *http.Request) {
	// userSession, _, exists, _ := returnCookie(r)

	data := PageData{
		Title:   "Welcome to Coin Flip!",
		Heading: "Flip the coin!",
		// IsLoggedIn: exists && !userSession.isExpired(),
	}

	err := Tmpl["index.html"].Execute(w, data)
	if err != nil {
			http.Error(w, "Error al procesar el template", http.StatusInternalServerError)
			return
	}
}

func GamePageHandler(w http.ResponseWriter, r *http.Request) {

	data := PageData{
		Title:   "Welcome to Coin Flip!",
		Heading: "Flip the coin!",
	}

	err := Tmpl["game.html"].Execute(w, data)
	if err != nil {
			http.Error(w, "Error al procesar el template", http.StatusInternalServerError)
			return
	}
}
