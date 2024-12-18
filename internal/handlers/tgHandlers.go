package handlers

import (
	"context"
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
      &models.InlineQueryResultArticle{
        ID: "2",
        Title: "Set up",
        InputMessageContent: &models.InputTextMessageContent{MessageText: "Set up your account"},
        ReplyMarkup: buildKeyboard(),
      },
    }

    b.AnswerInlineQuery(ctx, &bot.AnswerInlineQueryParams{
      InlineQueryID: update.InlineQuery.ID,
      Results:       results,
    })
  }
}

func buildKeyboard() models.ReplyMarkup {
	kb := &models.InlineKeyboardMarkup{
		InlineKeyboard: [][]models.InlineKeyboardButton{
			{
				{Text: "Option 1", CallbackData: "btn_opt1"},
				{Text: "Option 2", CallbackData: "btn_opt2"},
				{Text: "Option 3", CallbackData: "btn_opt3"},
			}, {
				{Text: "Select", CallbackData: "btn_select"},
			},
		},
	}

	return kb
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

