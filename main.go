package main

import (
	"coinFlip/internal/handlers"

  "context"
	"log"
	"html/template"
	"net/http"
	"os"
	"os/signal"
	"regexp"

	"github.com/go-telegram/bot"
	"github.com/joho/godotenv"
)

func init() {
	// loads values from .env into the system
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

func main()  {
	env := os.Getenv("ENV")

	// TG Bot setup
	var bot_token string

	switch env {
	case "prod":
		bot_token = os.Getenv("bot_key")
	case "test":
		bot_token = os.Getenv("bot_key_test")
	default:
		log.Fatal("No flag given")
	}

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()

	opts := []bot.Option{
		bot.WithDefaultHandler(handlers.DefaultHandler),
	}

	b, err := bot.New(bot_token, opts...)
	if err != nil {
		panic(err)
	}
	re := regexp.MustCompile(`^/setup`)
	b.RegisterHandlerRegexp(bot.HandlerTypeMessageText, re, handlers.SetupHandler)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	// HTTP server handlers
  http.HandleFunc("/", handlers.RootPageHandler)
	handlers.Tmpl["index.html"] = template.Must(template.ParseFiles("templates/layout.html", "templates/index.html"))

  http.HandleFunc("/game", handlers.GamePageHandler)
	handlers.Tmpl["game.html"] = template.Must(template.ParseFiles("templates/gameLayout.html", "templates/game.html"))


	// Start everything
	go b.Start(ctx)
	log.Print("Running bot...")

	log.Print("Running website")
	log.Println(http.ListenAndServe(":8080", nil))
}