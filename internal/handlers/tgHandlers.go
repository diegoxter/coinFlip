package handlers

import (
	"context"
	"log"
	"strings"

	"github.com/go-telegram/bot"
	"github.com/go-telegram/bot/models"
)

func DefaultHandler(ctx context.Context, b *bot.Bot, update *models.Update) {

	if update.CallbackQuery != nil {
    var gameUrl string
      switch update.CallbackQuery.GameShortName {

      case "flipCASCoin":
        gameUrl = ""

      case "flipCASCoin_test":
        gameUrl = "http://192.168.18.17:8080/game"
      }

      b.AnswerCallbackQuery(ctx, &bot.AnswerCallbackQueryParams{
        CallbackQueryID: update.CallbackQuery.ID,
        Text:            "Launching the game...",
        URL: gameUrl,
      })
	}

  if update.InlineQuery != nil {
    results := []models.InlineQueryResult{
      &models.InlineQueryResultGame{
        ID: "1",
        GameShortName: "flipCASCoin_test",
      },
    }

    b.AnswerInlineQuery(ctx, &bot.AnswerInlineQueryParams{
      InlineQueryID: update.InlineQuery.ID,
      Results:       results,
    })
  }
}

func CallbackHandler(ctx context.Context, b *bot.Bot, update *models.Update)  {
  // answering callback query first to let Telegram know that we received the callback query,
	// and we're handling it. Otherwise, Telegram might retry sending the update repetitively
	// as it thinks the callback query doesn't reach to our application. learn more by
	// reading the footnote of the https://core.telegram.org/bots/api#callbackquery type.
	b.AnswerCallbackQuery(ctx, &bot.AnswerCallbackQueryParams{
		CallbackQueryID: update.CallbackQuery.ID,
		ShowAlert:       false,
	})

  log.Printf("%v",update.CallbackQuery.Data)
}

func SetupHandler(ctx context.Context, b *bot.Bot, update *models.Update) {
	walletAddress := strings.TrimSpace("test")
	var msg string

	if len(walletAddress) < len("0QCOqkZj4H0lg5RgCzV5jxGmCF6XFiQDUrkpZOU9-DVNPpHN") {
		msg = "Invalid address, please retry"
	} else {
		msg = `Is this your wallet address?
<code>%s</code>`

	}

	b.SendMessage(ctx, &bot.SendMessageParams{
		Text:        msg,
		ParseMode:   "HTML",
	})
}


// UTILS

