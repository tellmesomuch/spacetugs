package main

import (
	"chat-server/pkg/mux"
	"chat-server/pkg/store"
)

func main() {
	store := store.NewStore()
	mux.Serve(":80", store)
}