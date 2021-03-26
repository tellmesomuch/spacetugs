package mux

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"chat-server/pkg/types"
	"chat-server/pkg/store"
)

// ServeAPI list and serve all rest API route
func ServeAPI(r *mux.Router, store *store.Store) {

	r.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(map[string]bool{"ok": true})
		log.Print("/api/health")
	})

	r.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request) {
		var loginMessage types.LoginMessage
		err := json.NewDecoder(r.Body).Decode(&loginMessage)
		if err != nil {
			json.NewEncoder(w).Encode(map[string]interface{}{"err": err})
		}

		store.AddUser(loginMessage.User)
		// Send message list
		messages := store.GetMessages()

		// resp, err := json.Marshal(messages)
		// if err != nil {
		// 	log.Print("error converting message list to json")
		// 	json.NewEncoder(w).Encode(map[string]bool{"ok": false})
		// }
		json.NewEncoder(w).Encode(messages)
	}).Methods("POST")

	r.HandleFunc("/api/rooms", func(w http.ResponseWriter, r *http.Request) {
		rooms := store.GetRooms()
		json.NewEncoder(w).Encode(rooms)
	}).Methods("GET")

	r.HandleFunc("/api/createRoom", func(w http.ResponseWriter, r *http.Request) {
		var roomMsg types.CreateRoomMessage
		err := json.NewDecoder(r.Body).Decode(&roomMsg)
		if err != nil {
			json.NewEncoder(w).Encode(map[string]interface{}{"err": err})
		}

		store.AddRoom(roomMsg.Room)
		// Send message list
		rooms := store.GetRooms()

		// resp, err := json.Marshal(messages)
		// if err != nil {
		// 	log.Print("error converting message list to json")
		// 	json.NewEncoder(w).Encode(map[string]bool{"ok": false})
		// }
		json.NewEncoder(w).Encode(rooms)
	}).Methods("POST")
}