package store

import (
	"testing"
)

var (
	s *Store
)

func init() {
	s = NewStore()
}

func TestRooms(t *testing.T) {

	// Creating new room
	s.AddRoom("test")

	rooms := s.GetRooms()

	if rooms[0] != "test" {
		t.Fatalf("Error on rooms test")
	}
}