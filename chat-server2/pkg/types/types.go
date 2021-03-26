package types

type  MessageBody struct {
	Username string
	Message string
}

type Message struct {
	Room string
	Mutation string
	Message MessageBody
}

type LoginMessage struct {
	User string
}

type CreateRoomMessage struct {
	Room string
}