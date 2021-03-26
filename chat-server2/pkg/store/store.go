package store

import (
	"chat-server/pkg/types"
)

type Store struct {
	UserList []string
	MessageList []types.Message
	RoomList []string
}

var users = []string{}
var messages = []types.Message{}
var rooms = []string{}

func NewStore() (store *Store){
	s := &Store{
		UserList: users,
		MessageList: messages,
		RoomList: rooms,
	}
	return s
}

func (s Store) GetMessages() (messageList []types.Message) {
	return messages
}

func (s Store) GetUsers() (userList []string) {
	return users
}

func (s Store) GetRooms() (messageList []string) {
	return rooms
}

func (s Store) AddUser(userNameString string) () {
	users = append(users, userNameString)
}

func (s Store) AddMessage(message types.Message) () {
	messages = append(messages, message)
}

func (s Store) AddRoom(roomName string) () {
	rooms = append(rooms, roomName)
}